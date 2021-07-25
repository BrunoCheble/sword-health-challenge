import { injectable, inject } from 'tsyringe';

import Task from '@modules/tasks/infra/typeorm/entities/Task';
import AppError from '@shared/errors/AppError';

import ITasksRepository from '@modules/tasks/repositories/ITasksRepository';
import IUsersRepository from '@modules/users/repositories/IUsersRepository';

interface IRequest {
  technician_id: number;
  summary: string;
  date: Date;
}

@injectable()
class CreateTaskService {
  constructor(
    @inject('TasksRepository')
    private tasksRepository: ITasksRepository,
    @inject('UsersRepository')
    private usersRepository: IUsersRepository
  ) {}

  public async execute({ technician_id, summary, date }: IRequest): Promise<Task> {

    const user = await this.usersRepository.findOne(technician_id);

    if (user === undefined) {
      throw new AppError("User dosen't exist.");
    }

    const task = await this.tasksRepository.create({
      summary,
      date,
      technician_id
    });

    return task;
  }
}

export default CreateTaskService;
