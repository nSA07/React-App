import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { CreateTaskDto } from './dto/create-task.dto';
import { UpdateTaskDto } from './dto/update-task.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Tasks } from './entities/task.entity';
import { Repository } from 'typeorm';
import { GetTaskFilterDto } from './dto/get-task.dto';

@Injectable()
export class TasksService {
  constructor(
    @InjectRepository(Tasks)
    private readonly tasksService: Repository<Tasks>,
  ) {}

  async create(createTaskDto: CreateTaskDto) {
    const newTask = {
      title: createTaskDto.title,
      description: createTaskDto.description,
      priority: createTaskDto.priority,
      board: { id: +createTaskDto.board },
    };

    if (!newTask) throw new BadRequestException('Some went wrong...');
    return await this.tasksService.save(newTask);
  }

  async findAll() {
    return await this.tasksService.find({
      relations: {
        board: true,
      },
    });
  }

  async findAllWithFilters(filterDto: GetTaskFilterDto) {
    const { board } = filterDto;
    const tasks = await this.tasksService.find({
      where: {
        board: {
          id: +board,
        },
      },
    });
    const sorTask = tasks.sort(
      (a: Tasks, b: Tasks): number =>
        this.getPriorityValue(b.priority) - this.getPriorityValue(a.priority),
    );
    return sorTask;
  }

  async findOne(id: number) {
    const task = await this.findTask(id);

    if (!task) throw new NotFoundException('Board not found');

    return task;
  }

  async update(id: number, updateTaskDto: UpdateTaskDto) {
    const task = await this.findTask(id);
    if (!task) throw new NotFoundException('Board not found!');
    return await this.tasksService.update(id, updateTaskDto);
  }

  async remove(id: number) {
    const task = await this.findTask(id);
    if (!task) throw new NotFoundException('Board not found!');
    return await this.tasksService.delete(id);
  }

  private async findTask(id: number): Promise<Tasks> {
    return await this.tasksService.findOne({
      where: {
        id,
      },
      relations: {
        board: true,
      },
    });
  }

  private getPriorityValue(priority: 'high' | 'medium' | 'low') {
    const priorityValues = { high: 3, medium: 2, low: 1 };
    return priorityValues[priority];
  }
}
