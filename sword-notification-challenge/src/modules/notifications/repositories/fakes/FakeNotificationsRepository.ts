//import { ObjectID } from 'mongodb';

import INotificationsRepository from '@modules/notifications/repositories/INotificationsRepository';
import ICreateNotificationDTO from '@modules/notifications/dtos/ICreateNotificationDTO';
import Notification from '../../infra/typeorm/entities/Notification';
import IFindAllUnreadByRecipientDTO from '@modules/notifications/dtos/IFindAllUnreadByRecipientDTO';
import IMarkAsReadNotificationDTO from '@modules/notifications/dtos/IMarkAsReadNotificationDTO';

class NotificationsRepository implements INotificationsRepository {

  private notifications: Notification[] = [];

  public async markAsReadByRecipient({
    recipient_id,
  }: IMarkAsReadNotificationDTO): Promise<number> {
    const notifications = this.notifications.filter(notification => notification.recipient_id === recipient_id && notification.read === 0);
    return notifications.map(notification => ({ ...notification , read: 1 })).length;
  }
  
  public async findAllUnreadByRecipient({
    recipient_id,
  }: IFindAllUnreadByRecipientDTO): Promise<Notification[]> {
    const notifications = this.notifications.filter(notification => notification.recipient_id === recipient_id && notification.read === 0);
    return notifications;
  }

  public async create({
    recipient_id,
    content,
    read
  }: ICreateNotificationDTO): Promise<Notification> {
    const notification = new Notification();

    Object.assign(notification, { content, recipient_id, read });

    this.notifications.push(notification);

    return notification;
  }
}

export default NotificationsRepository;
