import { Module } from '@nestjs/common';
import { EmailModule } from 'src/email/email.module';
import { EmailSettingsController } from './email-settings.controller';
import { EmailSettingsService } from './email-settings.service';

@Module({
  imports: [EmailModule],
  controllers: [EmailSettingsController],
  providers: [EmailSettingsService],
})
export class EmailSettingsModule {}
