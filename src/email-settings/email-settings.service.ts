import { Injectable } from '@nestjs/common';
import { PostmarkClient } from 'src/email/postmark-client';

@Injectable()
export class EmailSettingsService {
  constructor(private readonly postmarkClient: PostmarkClient) {}

  public async create(domain: string) {
    const addedDomainData = await this.postmarkClient.addDomain(domain);

    // Save the domain data to the database

    return addedDomainData;
  }

  public async verify(ID: number, type: 'DKIM' | 'ReturnPath') {
    const domainData = await this.postmarkClient[`verify${type}`](ID);

    // Save the domain data to the database

    return domainData;
  }

  public async delete(ID: number) {
    await this.postmarkClient.deleteDomain(ID);

    // Remove the domain data from the database

    return { message: 'Domain deleted' };
  }
}
