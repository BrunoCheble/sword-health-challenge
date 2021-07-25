import { container } from 'tsyringe';
import RestNotificationProvider from './implementations/RestNotificationProvider';

import INotificationProvider from './models/INotificationProvider';

container.registerSingleton<INotificationProvider>(
  'NotificationProvider',
  RestNotificationProvider,
);
