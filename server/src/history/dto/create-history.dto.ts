import { IsString } from 'class-validator';

export class CreateHistoryDto {
  @IsString()
  entityType: string;

  @IsString()
  entityId: number;

  @IsString()
  boardName: string;

  @IsString()
  operationType: string;

  @IsString()
  previousValues: string;

  @IsString()
  newValues: string;
}
