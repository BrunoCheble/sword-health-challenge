import 'reflect-metadata';
import FakeNotificationsRepository from '@modules/notifications/repositories/fakes/FakeNotificationsRepository';
import ListUnreadNotificationsService from './ListUnreadNotificationsService';

let fakeNotificationsRepository: FakeNotificationsRepository;
let listUnreadNotificationsService: ListUnreadNotificationsService;

describe('listUnreadNotifications', () => {
  beforeEach(() => {
    fakeNotificationsRepository = new FakeNotificationsRepository();
    listUnreadNotificationsService = new ListUnreadNotificationsService(
      fakeNotificationsRepository
    );
  });

  it('should be able to list the notifications by recipient', async () => {
    const notification1 = await fakeNotificationsRepository.create({
      recipient_id: 1,
      content: 'Test',
      read: 0
    });

    await fakeNotificationsRepository.create({
      recipient_id: 2,
      content: 'Test',
      read: 0
    });

    await fakeNotificationsRepository.create({
      recipient_id: 1,
      content: 'Test',
      read: 1
    });

   const notification2 = await fakeNotificationsRepository.create({
      recipient_id: 1,
      content: 'Test',
      read: 0
    });

    const notifications = await listUnreadNotificationsService.execute({
      user_id: '1',
    });

    expect(notifications).toEqual([notification1, notification2]);
  });
});
