import { Router } from 'express';
import { celebrate, Joi } from 'celebrate';

import NotificationsController from '../controllers/NotificationsController';
import UnreadNotificationsController from '../controllers/UnreadNotificationsController';

const notificationsRouter = Router();
const notificationsController = new NotificationsController();
const unreadNotificationsController = new UnreadNotificationsController();

notificationsRouter.post('/',
celebrate({
  body: {
    content: Joi.string().required(),
    recipient_id: Joi.number().required(),
  },
}),
notificationsController.create);

notificationsRouter.get('/', unreadNotificationsController.index);

export default notificationsRouter;
