import { Body, Controller, Delete, Param, Post } from '@nestjs/common';
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

  @Delete(':ID')
  public async delete(@Param('ID') ID: number) {
    return this.emailSettingsService.delete(ID);
  }
}
