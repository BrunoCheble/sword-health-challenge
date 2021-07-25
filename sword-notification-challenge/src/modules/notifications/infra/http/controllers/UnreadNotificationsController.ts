import { Request, Response } from 'express';
import { container } from 'tsyringe';

import ListUnreadNotificationsService from '@modules/notifications/services/ListUnreadNotificationsService';
import MarkAsReadNotificationsService from '@modules/notifications/services/MarkAsReadNotificationsService';

export default class UnreadNotificationsController {
  public async index(request: Request, response: Response): Promise<Response> {
    
    const listUnreadNotificationsService = container.resolve(ListUnreadNotificationsService);
    const markAsReadNotificationsService = container.resolve(MarkAsReadNotificationsService);    
    
    const recipient_id = parseInt(request.query.user_id.toString());
    const notifications = await listUnreadNotificationsService.execute({
      recipient_id,
    });

    await markAsReadNotificationsService.execute({
      recipient_id,
    });

    return response.json(notifications);
  }
}
