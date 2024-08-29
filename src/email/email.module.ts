import { Module } from '@nestjs/common';
import { EmailService } from './email.service';
import { PostmarkClient } from './postmark-client';

@Module({
  providers: [EmailService, PostmarkClient],
  exports: [EmailService, PostmarkClient],
})
export class EmailModule {}
