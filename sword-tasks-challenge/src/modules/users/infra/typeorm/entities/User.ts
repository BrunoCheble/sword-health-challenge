import {
  PrimaryGeneratedColumn,
  Entity,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  ManyToOne,
  JoinColumn,
  OneToMany
} from 'typeorm';

import Manager from '@modules/users/infra/typeorm/entities/User';
import Task from '@modules/tasks/infra/typeorm/entities/Task';

@Entity('users')
class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column({
    nullable: true,
  })
  manager_id: number;
  
  @ManyToOne(() => Manager)
  @JoinColumn({ name: 'manager_id' })
  manager?: Manager;
  
  @OneToMany(type => Task, tasks => tasks.technician_id)
  tasks: Task[];
  
  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;
}

export default User;
