import { Controller, Get, Param, InternalServerErrorException, Post, Body, UseInterceptors, CacheInterceptor, Query } from '@nestjs/common';
import { WinccRuntimeService } from './wincc-runtime/wincc-runtime.service';
import { ApiBody, ApiTags, ApiQuery } from '@nestjs/swagger';

@Controller('tags')
@ApiTags('Tags')
@UseInterceptors(CacheInterceptor)
export class TagsController {
  constructor(private readonly runtimeService: WinccRuntimeService) { }

  @Get('single/:TagName')
  async readTag(@Param('TagName') tagName: string) {

    try {
      const response = await this.runtimeService.ReadTag([tagName]);
      return response.Params.Tags[0];
    } catch (err) {
      throw new InternalServerErrorException(err);
    }
  }

  @Get('bulk')
  @ApiQuery({ name: 'Tags', type: [String] })
  async readSingleTag(@Query('Tags') Tags: string[] = []) {

    try {
      const response = await this.runtimeService.ReadTag(Tags);
      return response.Params.Tags;
    } catch (err) {
      throw new InternalServerErrorException(err);
    }
  }
}
