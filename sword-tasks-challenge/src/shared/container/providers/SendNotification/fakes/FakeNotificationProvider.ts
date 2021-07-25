import INotificationProvider from '../models/INotificationProvider';
import ISendNotificationDTO from '../dtos/ISendNotificationDTO';

export default class FakeNotificationProvider implements INotificationProvider {
  private notifications: ISendNotificationDTO[] = [];

  public async sendNotification(notification: ISendNotificationDTO): Promise<boolean> {
    this.notifications.push(notification);
    return true;
  }
}
