import { injectable, inject } from 'tsyringe';

import Notification from '@modules/notifications/infra/typeorm/entities/Notification';

import INotificationsRepository from '@modules/notifications/repositories/INotificationsRepository';

interface IRequest {
  recipient_id: number;
  content: string;
}

@injectable()
class CreateNotificationService {
  constructor(
    @inject('NotificationsRepository')
    private notificationsRepository: INotificationsRepository
  ) {}

  public async execute({ recipient_id, content }: IRequest): Promise<Notification> {
    const notification = await this.notificationsRepository.create({
      content,
      recipient_id,
      read: 0
    });

    return notification;
  }
}

export default CreateNotificationService;
