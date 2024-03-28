import { Module } from '@nestjs/common';
import { HistoryService } from './history.service';
import { HistoryController } from './history.controller';
import { History } from './entities/history.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Board } from '@board/entities/board.entity';
import { BoardService } from '@board/board.service';

@Module({
  imports: [TypeOrmModule.forFeature([History, Board])],
  controllers: [HistoryController],
  providers: [HistoryService, BoardService],
  exports: [HistoryService],
})
export class HistoryModule {}
