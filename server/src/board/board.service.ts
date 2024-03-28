import {
  BadGatewayException,
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { CreateBoardDto } from './dto/create-board.dto';
import { Repository } from 'typeorm';
import { Board } from './entities/board.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { UpdateBoardDto } from './dto/update-board.dto';

@Injectable()
export class BoardService {
  constructor(
    @InjectRepository(Board)
    private readonly boardService: Repository<Board>,
  ) {}

  async create(createBoardDto: CreateBoardDto) {
    const isUsed = await this.boardService.findBy({
      title: createBoardDto.title,
    });

    if (isUsed.length)
      throw new BadGatewayException('This board is already used');

    const newBoard = {
      title: createBoardDto.title,
    };

    return await this.boardService.save(newBoard);
  }

  async findAll() {
    return await this.boardService.find({
      relations: {
        tasks: true,
      },
    });
  }

  async findOne(id: number) {
    const board = this.findBoard(id);

    if (!board) throw new NotFoundException('Board not found');

    return board;
  }

  async update(id: number, updateBoardDto: UpdateBoardDto) {
    try {
      const board = await this.findBoard(id);
      if (!board) throw new NotFoundException('Board not found!');
      return await this.boardService.update(id, updateBoardDto);
    } catch (error) {
      throw new BadRequestException('Board title is used');
    }
  }

  async remove(id: number) {
    const board = await this.findBoard(id);
    if (!board) throw new NotFoundException('Board not found!');
    return await this.boardService.delete(id);
  }

  public async findBoard(id: number): Promise<Board> {
    return await this.boardService.findOne({
      where: {
        id,
      },
    });
  }
}
