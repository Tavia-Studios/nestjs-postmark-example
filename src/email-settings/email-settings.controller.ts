import { Body, Controller, Delete, Post } from '@nestjs/common';
import { EmailSettingsService } from './email-settings.service';

@Controller('email-settings')
export class EmailSettingsController {
  constructor(private readonly emailSettingsService: EmailSettingsService) {}

  @Post()
  public async create(@Body('domain') domain: string) {
    return this.emailSettingsService.create(domain);
  }

  @Post('verify')
  public async verify(
    @Body('ID') ID: number,
    @Body('type') type: 'DKIM' | 'ReturnPath',
  ) {
    return this.emailSettingsService.verify(ID, type);
  }

  @Delete()
  public async delete(@Body('ID') ID: number) {
    return this.emailSettingsService.delete(ID);
  }
}
