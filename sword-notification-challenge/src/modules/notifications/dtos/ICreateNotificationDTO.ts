export default interface ICreateNotificationDTO {
  content: string;
  recipient_id: number;
  read: 0 | 1
}