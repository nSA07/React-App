import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UsePipes,
  ValidationPipe,
  Query,
} from '@nestjs/common';
import { TasksService } from './tasks.service';
import { CreateTaskDto } from './dto/create-task.dto';
import { UpdateTaskDto } from './dto/update-task.dto';
import { GetTaskFilterDto } from './dto/get-task.dto';
import { HistoryService } from '@history/history.service';
import { BoardService } from '@board/board.service';

@Controller('tasks')
export class TasksController {
  constructor(
    private readonly tasksService: TasksService,
    private readonly historyService: HistoryService,
    private readonly boardService: BoardService,
  ) {}

  @Post()
  @UsePipes(new ValidationPipe())
  async create(@Body() createTaskDto: CreateTaskDto) {
    const newTask = await this.tasksService.create(createTaskDto);
    const board = await this.boardService.findBoard(newTask.board.id);
    const historyItem = {
      entityType: newTask.title,
      entityId: newTask.id,
      boardName: board.title,
      operationType: 'CREATE',
      previousValues: '',
      newValues: '',
    };
    await this.historyService.create(historyItem);
    return newTask;
  }

  @Get()
  findAll(@Query() filterDto: GetTaskFilterDto) {
    if (Object.keys(filterDto).length) {
      return this.tasksService.findAllWithFilters(filterDto);
    } else {
      return this.tasksService.findAll();
    }
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.tasksService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateTaskDto: UpdateTaskDto) {
    return this.tasksService.update(+id, updateTaskDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.tasksService.remove(+id);
  }
}
