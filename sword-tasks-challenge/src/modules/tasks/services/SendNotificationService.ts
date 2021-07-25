import { injectable, inject } from 'tsyringe';
import { format } from 'date-fns';

import AppError from '@shared/errors/AppError';

import INotificationProvider from '@shared/container/providers/SendNotification/models/INotificationProvider';
import ITasksRepository from '@modules/tasks/repositories/ITasksRepository';

interface IRequest {
  id: number;
  user_id: number;
}

@injectable()
class SendNotificationService {
  constructor(
    @inject('TasksRepository')
    private tasksRepository: ITasksRepository,
    @inject('NotificationProvider')
    private notificationProvider: INotificationProvider    
  ) {}

  public async execute({ id, user_id }: IRequest): Promise<boolean> {

    const task = await this.tasksRepository.findOne(id);

    if (task === undefined) {
      throw new AppError("Task dosen't exist.");
    }

    const recipient_id = task.technician.manager_id ?? 0;

    if (recipient_id === user_id) {
      return false;
    }
    
    const dateFormatted = format(task.date, 'dd/MM/yyyy HH:mm');

    const content = `The tech ${task.technician.name} performed the task #${task.id} on date ${dateFormatted}`;
    const sent_notification = await this.notificationProvider.sendNotification({ recipient_id, content });
    return sent_notification;
  }
}

export default SendNotificationService;
