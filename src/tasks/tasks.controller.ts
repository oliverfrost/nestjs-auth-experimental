import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  Query,
} from '@nestjs/common';
import { CreateTaskDTO } from './dto/create-task.dto';
import { Task } from './task.entity';
import { TasksService } from './tasks.service';
import { UpdateTaskStatusDTO } from './dto/update-task-status.dto';
import { GetTasksFilterDTO } from './dto/get-tasks-filter.dto';

@Controller('tasks')
export class TasksController {
  constructor(private tasksService: TasksService) {}

  @Get()
  getAllTasks(@Query() getTasksFilterDTO: GetTasksFilterDTO): Promise<Task[]> {
    return this.tasksService.getAllTasks(getTasksFilterDTO);
  }

  @Get('/:id')
  getTaskById(@Param('id') id: string): Promise<Task> {
    return this.tasksService.getTaskById(id);
  }

  @Post()
  createTask(@Body() createClassDTO: CreateTaskDTO): Promise<Task> {
    return this.tasksService.createTask(createClassDTO);
  }

  @Patch('/:id/status')
  updateTaskStatus(
    @Param('id') id: string,
    @Body() updateTaskStatusDTO: UpdateTaskStatusDTO,
  ): Promise<Task> {
    return this.tasksService.updateTaskStatus(id, updateTaskStatusDTO);
  }

  @Delete('/:id')
  deleteTask(@Param() id: string): Promise<void> {
    return this.tasksService.deleteTask(id);
  }
}
