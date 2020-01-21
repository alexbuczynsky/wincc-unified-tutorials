import { ApiProperty } from '@nestjs/swagger';

type ReadTagParams = WinCC.OpenPipe.Actions.ReadTag['Request']['Params'];

export class ReadTagPayload implements ReadTagParams {
  @ApiProperty()
  Tags: string[];
}
