import {
  PrimaryGeneratedColumn,
  Entity,
  Column,
  CreateDateColumn
} from 'typeorm';

@Entity('notifications')
class Notification {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  content: string;

  @Column()
  recipient_id: number;

  @Column({ default: 0 })
  read: number;

  @CreateDateColumn()
  created_at: Date;
}

export default Notification;
