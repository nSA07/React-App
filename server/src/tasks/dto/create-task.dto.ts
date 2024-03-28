import { Board } from '@board/entities/board.entity';
import { IsNotEmpty, IsString } from 'class-validator';

export class CreateTaskDto {
  @IsString()
  @IsNotEmpty()
  title: string;

  @IsNotEmpty()
  board: Board;

  @IsString()
  @IsNotEmpty()
  description: string;

  @IsString()
  @IsNotEmpty()
  priority: 'high' | 'medium' | 'low';
}
