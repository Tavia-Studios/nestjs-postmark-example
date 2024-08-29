import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import * as postmark from 'postmark';

@Injectable()
export class PostmarkClient {
  private client: postmark.ServerClient;
  private accountClient: postmark.AccountClient;

  constructor(private readonly configService: ConfigService) {
    this.client = new postmark.ServerClient(
      this.configService.getOrThrow<string>('POSTMARK_SERVER_TOKEN'),
    );
    this.accountClient = new postmark.AccountClient(
      this.configService.getOrThrow<string>('POSTMARK_ACCOUNT_TOKEN'),
    );
  }

  public send(
    mail: postmark.Models.Message,
  ): Promise<postmark.Models.MessageSendingResponse> {
    try {
      return this.client.sendEmail(mail);
    } catch (error) {
      throw new Error(error);
    }
  }

  public sendTemplated(
    mail: postmark.Models.TemplatedMessage,
  ): Promise<postmark.Models.MessageSendingResponse> {
    try {
      return this.client.sendEmailWithTemplate(mail);
    } catch (error) {
      throw new Error(error);
    }
  }

  /**
   * Domain Management
   */
  public async addDomain(
    domain: string,
  ): Promise<postmark.Models.DomainDetails> {
    try {
      const res = await this.accountClient.createDomain({
        Name: domain,
        ReturnPathDomain: `pm-bounces.${domain}`,
      });
      return res;
    } catch (error) {
      throw new Error(error);
    }
  }

  public async verifyDKIM(ID: number): Promise<postmark.Models.DomainDetails> {
    try {
      const res = await this.accountClient.verifyDomainDKIM(ID);
      return res;
    } catch (error) {
      throw new Error(error);
    }
  }

  public async verifyReturnPath(
    ID: number,
  ): Promise<postmark.Models.DomainDetails> {
    try {
      const res = await this.accountClient.verifyDomainReturnPath(ID);
      return res;
    } catch (error) {
      throw new Error(error);
    }
  }

  public async deleteDomain(ID: number): Promise<void> {
    try {
      await this.accountClient.deleteDomain(ID);
    } catch (error) {
      throw new Error(error);
    }
  }
}
