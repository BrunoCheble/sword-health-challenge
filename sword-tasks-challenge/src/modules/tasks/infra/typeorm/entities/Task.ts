import {
  PrimaryGeneratedColumn,
  Entity,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  ManyToOne,
  JoinColumn
} from 'typeorm';

import User from '@modules/users/infra/typeorm/entities/User';

@Entity('tasks')
class Task {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  summary: string;

  @Column()
  technician_id: number;
  
  @ManyToOne(() => User)
  @JoinColumn({ name: 'technician_id' })
  technician: User;
  
  @Column()
  date: Date;

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;
}

export default Task;
