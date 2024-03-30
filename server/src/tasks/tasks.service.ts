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
import { HistoryService } from '@history/history.service';
import { ChangeValueDto } from '@history/dto/create-history.dto';

@Injectable()
export class TasksService {
  constructor(
    @InjectRepository(Tasks)
    private readonly tasksService: Repository<Tasks>,
    private readonly historyService: HistoryService,
  ) {}

  async create(createTaskDto: CreateTaskDto) {
    const newTask = {
      title: createTaskDto.title,
      description: createTaskDto.description,
      priority: createTaskDto.priority,
      board: { id: +createTaskDto.board },
    };

    const currentTask = await this.tasksService.save(newTask);
    const task = await this.findTask(currentTask.id);
    await this.historyService.create({
      changes: [
        {
          boardName: task.board.title,
          dueData: `${task.createAt}`,
          field: 'added',
          prev: '',
          next: task.title,
        },
      ],
      taskId: `${task.id}`,
    });
    if (!newTask) throw new BadRequestException('Some went wrong...');
    return currentTask;
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
    const currentTask = await this.findTask(id);
    const task = await this.tasksService.update(id, updateTaskDto);
    const updateTask = await this.findTask(id);

    this.sendHistoryValue(currentTask, updateTask, id);

    if (!currentTask) throw new NotFoundException('Board not found!');
    return task;
  }

  async remove(id: number) {
    const task = await this.findTask(id);
    await this.historyService.create({
      changes: [
        {
          boardName: task.board.title,
          dueData: `${task.createAt}`,
          field: 'remove',
          prev: task.title,
          next: '',
        },
      ],
      taskId: `${id}`,
    });

    if (!task) throw new NotFoundException('Board not found!');
    return await this.tasksService.delete(id);
  }

  private sendHistoryValue(
    currentTask: Tasks,
    updateTask: Tasks,
    id: number,
  ): void {
    const prev = {
      title: currentTask.title,
      description: currentTask.description,
      priority: currentTask.priority,
      board: currentTask.board.title,
    };

    const next = {
      title: updateTask.title,
      description: updateTask.description,
      priority: updateTask.priority,
      board: updateTask.board.title,
    };

    const findChanges = (prev: ChangeValueDto, next: ChangeValueDto) => {
      const result = [];
      for (const key in prev) {
        if (prev[key] !== next[key]) {
          result.push({
            field: key,
            prev: prev[key],
            next: next[key],
          });
        }
      }
      return result;
    };

    const history = findChanges(prev, next);

    history.forEach(async (el) => {
      await this.historyService.create({
        changes: [
          {
            taskName: currentTask.title,
            dueData: `${currentTask.createAt}`,
            field: el.field,
            prev: el.prev,
            next: el.next,
          },
        ],
        taskId: `${id}`,
      });
    });
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
