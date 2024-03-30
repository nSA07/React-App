import { Injectable, Param } from '@nestjs/common';
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
    return await this.historyService.save(createHistoryDto);
  }

  async findAll() {
    return await this.historyService.find();
  }

  async findAllById(@Param('id') id: string) {
    return this.historyService.find({
      where: [
        {
          taskId: id,
        },
      ],
    });
  }
}
