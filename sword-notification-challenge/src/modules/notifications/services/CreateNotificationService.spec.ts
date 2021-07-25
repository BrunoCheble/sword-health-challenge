import 'reflect-metadata';
import FakeNotificationsRepository from '@modules/notifications/repositories/fakes/FakeNotificationsRepository';
import CreateNotificationService from './CreateNotificationService';

let fakeNotificationsRepository: FakeNotificationsRepository;
let createNotificationService: CreateNotificationService;

describe('createNotification', () => {
  beforeEach(() => {
    fakeNotificationsRepository = new FakeNotificationsRepository();
    createNotificationService = new CreateNotificationService(
      fakeNotificationsRepository
    );
  });

  it('should be able to create the notifications', async () => {
    const notification1 = await fakeNotificationsRepository.create({
      recipient_id: 1,
      content: 'Notification Content',
      read: 0
    });

    const notification = await createNotificationService.execute({
      user_id: '1',
      content: notification1.content
    });

    expect(notification).toEqual(notification1);
  });
});