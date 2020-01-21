import { Module } from '@nestjs/common';
import { WinccRuntimeService } from './wincc-runtime.service';

@Module({
  providers: [WinccRuntimeService],
  exports: [WinccRuntimeService],
})
export class WinCCRuntimeModule { }
