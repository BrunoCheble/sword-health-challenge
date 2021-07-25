import { injectable, inject } from 'tsyringe';

import Task from '@modules/tasks/infra/typeorm/entities/Task';
import AppError from '@shared/errors/AppError';

import ITasksRepository from '@modules/tasks/repositories/ITasksRepository';
import IUsersRepository from '@modules/users/repositories/IUsersRepository';

interface IRequest {
  user_id: number;
}

@injectable()
class ListTaskService {
  constructor(
    @inject('TasksRepository')
    private tasksRepository: ITasksRepository,
    @inject('UsersRepository')
    private usersRepository: IUsersRepository
  ) {}

  public async execute({ user_id }: IRequest): Promise<Task[]> {

    const user = await this.usersRepository.findOne(user_id);

    if (user === undefined) {
      throw new AppError("User dosen't exist.");
    }

    let tasks:Task[] = [];

    if (user.manager_id === null) {
      tasks = await this.tasksRepository.findAllByManager({ manager_id: user.id });
      console.log(tasks);
    }
    else {
      tasks = await this.tasksRepository.findAllByTechnician({ technician_id: user.id });
    }

    return tasks;
  }
}

export default ListTaskService;
