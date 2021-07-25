import { injectable, inject } from 'tsyringe';

import AppError from '@shared/errors/AppError';

import ITasksRepository from '@modules/tasks/repositories/ITasksRepository';
import IUsersRepository from '@modules/users/repositories/IUsersRepository';

interface IRequest {
  id: number;
  user_id: number;
}

@injectable()
class DeleteTaskService {
  constructor(
    @inject('TasksRepository')
    private tasksRepository: ITasksRepository,
    @inject('UsersRepository')
    private usersRepository: IUsersRepository
  ) {}

  public async execute({ id, user_id }: IRequest): Promise<number> {

    const user = await this.usersRepository.findOne(user_id);

    if (user === undefined) {
      throw new AppError("User dosen't exist.");
    }

    const task = await this.tasksRepository.findOne(id);

    if (task === undefined) {
      throw new AppError("Task dosen't exist.");
    }

    if (task.technician.manager_id !== user.id) {
      throw new AppError("You can't delete this task.");
    }

    const deleted_task = await this.tasksRepository.delete(id);

    return deleted_task;
  }
}

export default DeleteTaskService;
