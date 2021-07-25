import ICreateNotificationDTO from '../dtos/ICreateNotificationDTO';
import IMarkAsReadNotificationDTO from '@modules/notifications/dtos/IMarkAsReadNotificationDTO';
import IFindAllUnreadByRecipientDTO from '@modules/notifications/dtos/IFindAllUnreadByRecipientDTO';
import Notification from '../infra/typeorm/entities/Notification';

export default interface INotificationsRepository {
  create(data: ICreateNotificationDTO): Promise<Notification>;
  markAsReadByRecipient(data: IMarkAsReadNotificationDTO): Promise<number>;
  findAllUnreadByRecipient(data: IFindAllUnreadByRecipientDTO): Promise<Notification[]>;
}
