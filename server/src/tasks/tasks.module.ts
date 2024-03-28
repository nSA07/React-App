import { Module } from '@nestjs/common';
import { TasksService } from './tasks.service';
import { TasksController } from './tasks.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Tasks } from './entities/task.entity';
import { HistoryService } from '@history/history.service';
import { History } from '@history/entities/history.entity';
import { Board } from '@board/entities/board.entity';
import { BoardService } from '@board/board.service';

@Module({
  imports: [TypeOrmModule.forFeature([Tasks, History, Board])],
  controllers: [TasksController],
  providers: [TasksService, HistoryService, BoardService],
})
export class TasksModule {}
