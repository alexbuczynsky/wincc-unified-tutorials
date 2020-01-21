import { Controller, Get, Param, Put, Body, InternalServerErrorException } from '@nestjs/common';
import { UserConfigService } from './user-config.service';
import { ApiTags, ApiBody } from '@nestjs/swagger';
import { IUserConfig } from './user-config.interface';
import { generateDefaultUserConfig } from './user-config.default';

@Controller('user-config')
@ApiTags('User')
export class UserConfigController {

  constructor(private readonly userConfigService: UserConfigService) { }

  @Get(':username')
  async readTag(@Param('username') username: string) {

    try {
      const response = await this.userConfigService.ReadConfig(username);
      return response;
    } catch (err) {
      throw new InternalServerErrorException(err);
    }
  }

  @Put(':username')
  @ApiBody({
    schema: {
      example: generateDefaultUserConfig('username'),
    },
  })
  async readSingleTag(@Param('username') username: string, @Body() body: Partial<IUserConfig>) {

    try {
      const response = await this.userConfigService.UpdateConfig(username, body);
      return response;
    } catch (err) {
      throw new InternalServerErrorException(err);
    }
  }

}
