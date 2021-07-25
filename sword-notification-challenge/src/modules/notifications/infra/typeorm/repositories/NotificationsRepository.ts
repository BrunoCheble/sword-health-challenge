import { getRepository, Repository } from 'typeorm';
import INotificationsRepository from '@modules/notifications/repositories/INotificationsRepository';
import ICreateNotificationDTO from '@modules/notifications/dtos/ICreateNotificationDTO';
import IMarkAsReadNotificationDTO from '@modules/notifications/dtos/IMarkAsReadNotificationDTO';
import IFindAllUnreadByRecipientDTO from '@modules/notifications/dtos/IFindAllUnreadByRecipientDTO';

import Notification from '../entities/Notification';

class NotificationsRepository implements INotificationsRepository {
  private ormRepository: Repository<Notification>;

  constructor() {
    this.ormRepository = getRepository(Notification);
  }

  public async create({
    content,
    recipient_id,
    read,
  }: ICreateNotificationDTO): Promise<Notification> {
    const notification = this.ormRepository.create({ 
      content, 
      recipient_id,
      read
    });
    await this.ormRepository.save(notification);
    return notification;
  }

  public async markAsReadByRecipient({
    recipient_id,
  }: IMarkAsReadNotificationDTO): Promise<number> {
    const notifications = await this.ormRepository.update({ 
      recipient_id, 
      read: 0 
    },
    {
      read: 1 
    });

    return notifications.affected ?? 0;
  }

  public async findAllUnreadByRecipient({ 
    recipient_id
  }: IFindAllUnreadByRecipientDTO): Promise<Notification[]> {
    const notifications = await this.ormRepository.find({
      where: { recipient_id, read: 0 },
    });
    return notifications;
  }
}

export default NotificationsRepository;
