import { Request, Response } from 'express';
import { container } from 'tsyringe';

import CreateNotificationService from '@modules/notifications/services/CreateNotificationService';

export default class NotificationsController {
  public async create(request: Request, response: Response): Promise<Response> {
    const createNotificationService = container.resolve(CreateNotificationService);    
    const { content, recipient_id } = request.body;
    
    const notification = await createNotificationService.execute({
      recipient_id,
      content
    });

    return response.json(notification);
  }
}