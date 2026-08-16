import { Body, Controller, Get, Put, UseGuards } from '@nestjs/common';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { CurrentUser } from '../auth/decorators/current-user.decorator';
import { ProfilesService } from './profiles.service';
import { UpsertProfileDto } from './dto/upsert-profile.dto';

@UseGuards(JwtAuthGuard)
@Controller('profiles')
export class ProfilesController {
  constructor(private readonly profilesService: ProfilesService) {}

  @Get('me')
  getMyProfile(@CurrentUser() user: { userId: string }) {
    return this.profilesService.getMyProfile(user.userId);
  }

  @Put('me')
  upsertMyProfile(@CurrentUser() user: { userId: string }, @Body() dto: UpsertProfileDto) {
    return this.profilesService.upsertMyProfile(user.userId, dto);
  }
}
