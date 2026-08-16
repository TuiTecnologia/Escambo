import {
  ConflictException,
  Injectable,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';
import { PrismaService } from '../prisma/prisma.service';
import { NotificationsService } from '../notifications/notifications.service';
import { RegisterDto } from './dto/register.dto';
import { LoginDto } from './dto/login.dto';
import { VerifyCodeDto } from './dto/verify-code.dto';

const VERIFICATION_CODE_TTL_MINUTES = 15;

@Injectable()
export class AuthService {
  constructor(
    private readonly prisma: PrismaService,
    private readonly jwtService: JwtService,
    private readonly notifications: NotificationsService,
  ) {}

  async register(dto: RegisterDto) {
    const existing = await this.prisma.user.findFirst({
      where: { OR: [{ email: dto.email }, { phone: dto.phone }] },
    });
    if (existing) {
      throw new ConflictException('E-mail ou telefone já cadastrado.');
    }

    const passwordHash = await bcrypt.hash(dto.password, 10);
    const user = await this.prisma.user.create({
      data: {
        name: dto.name,
        email: dto.email,
        phone: dto.phone,
        passwordHash,
      },
    });

    await this.issueVerificationCode(user.id, 'EMAIL', user.email);
    await this.issueVerificationCode(user.id, 'PHONE', user.phone);

    return {
      id: user.id,
      name: user.name,
      email: user.email,
      phone: user.phone,
      ...this.issueTokens(user.id),
    };
  }

  async login(dto: LoginDto) {
    const user = await this.prisma.user.findUnique({ where: { email: dto.email } });
    if (!user) throw new UnauthorizedException('Credenciais inválidas.');

    const passwordMatches = await bcrypt.compare(dto.password, user.passwordHash);
    if (!passwordMatches) throw new UnauthorizedException('Credenciais inválidas.');

    return {
      id: user.id,
      name: user.name,
      email: user.email,
      emailVerified: Boolean(user.emailVerifiedAt),
      phoneVerified: Boolean(user.phoneVerifiedAt),
      ...this.issueTokens(user.id),
    };
  }

  async resendCode(userId: string, channel: 'EMAIL' | 'PHONE') {
    const user = await this.prisma.user.findUnique({ where: { id: userId } });
    if (!user) throw new NotFoundException('Usuário não encontrado.');

    await this.issueVerificationCode(user.id, channel, channel === 'EMAIL' ? user.email : user.phone);
    return { sent: true };
  }

  async verifyCode(userId: string, dto: VerifyCodeDto) {
    const record = await this.prisma.verificationCode.findFirst({
      where: {
        userId,
        channel: dto.channel,
        code: dto.code,
        consumedAt: null,
        expiresAt: { gt: new Date() },
      },
      orderBy: { createdAt: 'desc' },
    });

    if (!record) {
      throw new UnauthorizedException('Código inválido ou expirado.');
    }

    await this.prisma.verificationCode.update({
      where: { id: record.id },
      data: { consumedAt: new Date() },
    });

    const data =
      dto.channel === 'EMAIL' ? { emailVerifiedAt: new Date() } : { phoneVerifiedAt: new Date() };

    const user = await this.prisma.user.update({ where: { id: userId }, data });

    return {
      emailVerified: Boolean(user.emailVerifiedAt),
      phoneVerified: Boolean(user.phoneVerifiedAt),
    };
  }

  private async issueVerificationCode(userId: string, channel: 'EMAIL' | 'PHONE', destination: string) {
    const code = Math.floor(100000 + Math.random() * 900000).toString();
    const expiresAt = new Date(Date.now() + VERIFICATION_CODE_TTL_MINUTES * 60 * 1000);

    await this.prisma.verificationCode.create({
      data: { userId, channel, code, expiresAt },
    });

    if (channel === 'EMAIL') {
      await this.notifications.sendEmailVerificationCode(destination, code);
    } else {
      await this.notifications.sendPhoneVerificationCode(destination, code);
    }
  }

  private issueTokens(userId: string) {
    return {
      accessToken: this.jwtService.sign({ sub: userId }),
    };
  }
}
