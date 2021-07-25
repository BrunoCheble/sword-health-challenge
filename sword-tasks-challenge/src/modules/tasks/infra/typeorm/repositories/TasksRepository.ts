import { getRepository, Repository } from 'typeorm';
import ITasksRepository from '@modules/tasks/repositories/ITasksRepository';

import Task from '../entities/Task';
import ICreateTaskDTO from '@modules/tasks/dtos/ICreateTaskDTO';
import IFindAllTaskByManagerDTO from '@modules/tasks/dtos/IFindAllTaskByManagerDTO';
import IFindAllTaskByTechnicianDTO from '@modules/tasks/dtos/IFindAllTaskByTechnicianDTO';

class TasksRepository implements ITasksRepository {
  private ormRepository: Repository<Task>;

  constructor() {
    this.ormRepository = getRepository(Task);
  }

  public async create({
    summary,
    technician_id,
    date,
  }: ICreateTaskDTO): Promise<Task> {
    const task = this.ormRepository.create({
      summary,
      technician_id,
      date
    });
    await this.ormRepository.save(task);
    return task;
  }

  public async update(task: Task): Promise<Task> {
    return this.ormRepository.save(task);
  }

  public async delete(id: number): Promise<number> {    
    const deleted_task = await this.ormRepository.delete({ id });
    return deleted_task.affected ?? 0;
  }

  public async findOne(id: number): Promise<Task | undefined> {    
    const task = await this.ormRepository.findOne({ 
      relations: ["technician"],
      where: { id }
    });
    return task;
  }

  public async findAllByManager({ manager_id }: IFindAllTaskByManagerDTO): Promise<Task[]> {
    const tasks = await this.ormRepository.find({
      relations: ["technician"]
    });

    return tasks.filter(task => task.technician.manager_id === manager_id);
  }

  public async findAllByTechnician({ technician_id }: IFindAllTaskByTechnicianDTO): Promise<Task[]> {
    const tasks = await this.ormRepository.find({
      where: { technician_id },
    });
    return tasks;
  }
}

export default TasksRepository;
