import { Body, Controller, Get, Post } from '@nestjs/common';
import { AppService } from './app.service';
import { EmailService } from './email/email.service';

@Controller()
export class AppController {
  constructor(
    private readonly appService: AppService,
    private readonly emailService: EmailService,
  ) {}

  @Get()
  getHello(): string {
    return this.appService.getHello();
  }

  @Post('send-email')
  async sendEmail(
    @Body() sendEmailDto: { to: string; subject: string; body: string },
  ): Promise<string> {
    const { to, subject, body } = sendEmailDto;

    await this.emailService.sendEmail(to, subject, body);

    return 'Sending email';
  }

  @Post('send-email-with-template')
  async sendEmailWithTemplate(
    @Body()
    sendEmailWithTemplateDto: {
      to: string;
      templateId: number;
      templateData: any;
    },
  ): Promise<string> {
    const { to, templateId, templateData } = sendEmailWithTemplateDto;

    await this.emailService.sendEmailWithTemplate(to, templateId, templateData);

    return 'Sending email with template';
  }
}
