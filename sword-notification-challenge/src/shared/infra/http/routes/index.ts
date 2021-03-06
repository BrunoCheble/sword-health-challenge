import { Router } from 'express';

import notificationsRouter from '@modules/notifications/infra/http/routes/notifications.routes';

const routes = Router();

routes.use('/notifications', notificationsRouter);

export default routes;
