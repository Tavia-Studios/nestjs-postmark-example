import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { EmailModule } from './email/email.module';
import { EmailSettingsModule } from './email-settings/email-settings.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: ['.env.local', '.env'],
      isGlobal: true,
    }),
    EmailModule,
    EmailSettingsModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
