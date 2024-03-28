import { Injectable } from '@nestjs/common';
import { CreateHistoryDto } from './dto/create-history.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { History } from './entities/history.entity';

@Injectable()
export class HistoryService {
  constructor(
    @InjectRepository(History)
    private readonly historyService: Repository<History>,
  ) {}

  async create(createHistoryDto: CreateHistoryDto) {
    const newHistory = {
      entityType: createHistoryDto.entityType,
      entityId: createHistoryDto.entityId,
      operationType: createHistoryDto.operationType,
      newValues: createHistoryDto.newValues,
      previousValues: createHistoryDto.previousValues,
      boardName: createHistoryDto.boardName,
    };
    return await this.historyService.save(newHistory);
  }

  async findAll() {
    return await this.historyService.find();
  }
}
