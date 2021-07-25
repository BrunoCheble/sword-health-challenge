import { injectable, inject } from 'tsyringe';

import Task from '@modules/tasks/infra/typeorm/entities/Task';
import AppError from '@shared/errors/AppError';

import ITasksRepository from '@modules/tasks/repositories/ITasksRepository';
import IUsersRepository from '@modules/users/repositories/IUsersRepository';

interface IRequest {
  id: number;
  technician_id: number;
  summary: string;
  date: Date;
}

@injectable()
class UpdateTaskService {
  constructor(
    @inject('TasksRepository')
    private tasksRepository: ITasksRepository,
    @inject('UsersRepository')
    private usersRepository: IUsersRepository
  ) {}

  public async execute({ id, summary, date, technician_id }: IRequest): Promise<Task> {

    const user = await this.usersRepository.findOne(technician_id);

    if (user === undefined) {
      throw new AppError("User dosen't exist.");
    }

    const task = await this.tasksRepository.findOne(id);

    if (task === undefined) {
      throw new AppError("Task dosen't exist.");
    }

    if (task.technician_id !== user.id) {
      throw new AppError("You can't update this task.");
    }

    const saved_task = await this.tasksRepository.update({ 
      ...task, 
      summary,
      date
    });

    return saved_task;
  }
}

export default UpdateTaskService;
