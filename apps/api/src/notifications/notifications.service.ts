import { Injectable, Logger } from '@nestjs/common';

/**
 * Stub de notificação para o MVP local: registra o código no log em vez de
 * enviar de verdade. Troque a implementação por SES/Resend (e-mail) e
 * Twilio/Zenvia (SMS/WhatsApp) conforme a seção 14 do ROADMAP.md.
 */
@Injectable()
export class NotificationsService {
  private readonly logger = new Logger(NotificationsService.name);

  async sendEmailVerificationCode(email: string, code: string): Promise<void> {
    this.logger.log(`[email:${email}] código de verificação: ${code}`);
  }

  async sendPhoneVerificationCode(phone: string, code: string): Promise<void> {
    this.logger.log(`[phone:${phone}] código de verificação: ${code}`);
  }
}
