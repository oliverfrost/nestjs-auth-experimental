import { Injectable, NotFoundException } from '@nestjs/common';
import { TaskStatus } from './task-status.enum';
import { CreateTaskDTO } from './dto/create-task.dto';
import { TaskRepository } from './task.repository';
import { InjectRepository } from '@nestjs/typeorm';
import { Task } from './task.entity';
import { UpdateTaskStatusDTO } from './dto/update-task-status.dto';
import { GetTasksFilterDTO } from './dto/get-tasks-filter.dto';

@Injectable()
export class TasksService {
  constructor(
    @InjectRepository(TaskRepository)
    private taskRepository: TaskRepository,
  ) {}

  async getAllTasks(getTasksFilterDTO: GetTasksFilterDTO): Promise<Task[]> {
    return this.taskRepository.getTasks(getTasksFilterDTO);
  }

  async getTaskById(id: string): Promise<Task> {
    const found = await this.taskRepository.findOne({ id });

    if (!found) {
      throw new NotFoundException(`Task with id '${id}' is not found`);
    }

    return found;
  }

  async createTask(createTaskDTO: CreateTaskDTO): Promise<Task> {
    return this.taskRepository.createTask(createTaskDTO);
  }

  async deleteTask(id: string): Promise<void> {
    return this.taskRepository.deleteTask(id);
  }

  async updateTaskStatus(
    id: string,
    updateTaskStatusDTO: UpdateTaskStatusDTO,
  ): Promise<Task> {
    const task = await this.getTaskById(id);
    const { status } = updateTaskStatusDTO;

    task.status = status;
    this.taskRepository.save(task);
    return task;
  }
}
