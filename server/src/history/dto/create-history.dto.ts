import { IsString } from 'class-validator';

export class CreateHistoryDto {
  @IsString()
  taskId: string;

  changes: { [key: string]: string }[];
}

export class ChangeValueDto {
  @IsString()
  title: string;

  @IsString()
  description: string;

  @IsString()
  priority: string;

  @IsString()
  board: string;
}
