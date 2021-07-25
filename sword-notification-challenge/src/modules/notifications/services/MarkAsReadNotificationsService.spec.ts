import 'reflect-metadata';
import FakeNotificationsRepository from '@modules/notifications/repositories/fakes/FakeNotificationsRepository';
import MarkAsReadNotificationsService from './MarkAsReadNotificationsService';

let fakeNotificationsRepository: FakeNotificationsRepository;
let markAsReadNotificationsService: MarkAsReadNotificationsService;

describe('markAsReadNotifications', () => {
  beforeEach(() => {
    fakeNotificationsRepository = new FakeNotificationsRepository();
    markAsReadNotificationsService = new MarkAsReadNotificationsService(
      fakeNotificationsRepository
    );
  });

  it('should be able to mark as read the unread notifications by recipient', async () => {
    await fakeNotificationsRepository.create({
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
      read: 0
    });

    await fakeNotificationsRepository.create({
      recipient_id: 1,
      content: 'Test',
      read: 1
    });

    const affected_notifications = await markAsReadNotificationsService.execute({
      user_id: '1',
    });

    expect(affected_notifications).toEqual(2);
  });
});
