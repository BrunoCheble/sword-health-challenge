import { injectable, inject } from 'tsyringe';

import Notification from '@modules/notifications/infra/typeorm/entities/Notification';

import INotificationsRepository from '@modules/notifications/repositories/INotificationsRepository';

interface IRequest {
  recipient_id: number;
}

@injectable()
class ListUnreadNotificationsService {
  constructor(
    @inject('NotificationsRepository')
    private notificationsRepository: INotificationsRepository
  ) {}

  public async execute({ recipient_id }: IRequest): Promise<Notification[]> {

    const notifications = await this.notificationsRepository.findAllUnreadByRecipient({
      recipient_id,
    });

    return notifications;
  }
}

export default ListUnreadNotificationsService;
