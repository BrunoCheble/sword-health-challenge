import { injectable, inject } from 'tsyringe';

import INotificationsRepository from '@modules/notifications/repositories/INotificationsRepository';

interface IRequest {
  recipient_id: number;
}

@injectable()
class MarkAsReadNotificationsService {
  constructor(
    @inject('NotificationsRepository')
    private notificationsRepository: INotificationsRepository
  ) {}

  public async execute({ recipient_id }: IRequest): Promise<number> {

    const affected = await this.notificationsRepository.markAsReadByRecipient({ recipient_id });

    return affected;
  }
}

export default MarkAsReadNotificationsService;
