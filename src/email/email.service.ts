import { Injectable } from '@nestjs/common';
import * as postmark from 'postmark';
import { PostmarkClient } from './postmark-client';

@Injectable()
export class EmailService {
  constructor(private readonly postMarkClient: PostmarkClient) {}

  async sendEmail(
    to: string,
    from: string,
    subject: string,
    body: string,
  ): Promise<postmark.Models.MessageSendingResponse> {
    const mail: postmark.Models.Message = {
      From: from,
      To: to,
      Subject: subject,
      TextBody: body,
    };

    return await this.postMarkClient.send(mail);
  }

  async sendEmailWithTemplate(
    to: string,
    templateId: number,
    templateData: any,
  ): Promise<postmark.Models.MessageSendingResponse> {
    const mail: postmark.Models.TemplatedMessage = {
      From: 'luke@taviastudios.tech',
      To: to,
      TemplateId: templateId,
      TemplateModel: templateData,
    };

    return await this.postMarkClient.sendTemplated(mail);
  }
}
