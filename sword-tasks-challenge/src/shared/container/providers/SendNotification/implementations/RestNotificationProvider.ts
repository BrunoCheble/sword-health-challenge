import INotificationProvider from '../models/INotificationProvider';
import ISendNotificationDTO from '../dtos/ISendNotificationDTO';
import axios from 'axios';

class RestNotificationProvider implements INotificationProvider {
  public async sendNotification({ recipient_id, content }: ISendNotificationDTO): Promise<boolean> {

    const sent = await axios.post('http://notifications:3333/notifications', {
      recipient_id,
      content
    });

    return sent.status === 200;
  }
}

export default RestNotificationProvider;