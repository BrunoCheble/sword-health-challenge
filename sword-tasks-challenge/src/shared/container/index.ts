import { container } from 'tsyringe';

import './providers';

import IUsersRepository from '@modules/users/repositories/IUsersRepository';
import UsersRepository from '@modules/users/infra/typeorm/repositories/UsersRepository';

import ITasksRepository from '@modules/tasks/repositories/ITasksRepository';
import TasksRepository from '@modules/tasks/infra/typeorm/repositories/TasksRepository';

container.registerSingleton<IUsersRepository>(
  'UsersRepository',
  UsersRepository,
);

container.registerSingleton<ITasksRepository>(
  'TasksRepository',
  TasksRepository,
);