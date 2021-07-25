import ITasksRepository from '@modules/tasks/repositories/ITasksRepository';

import Task from '../../infra/typeorm/entities/Task';
import ICreateTaskDTO from '@modules/tasks/dtos/ICreateTaskDTO';
import IFindAllTaskByManagerDTO from '@modules/tasks/dtos/IFindAllTaskByManagerDTO';
import IFindAllTaskByTechnicianDTO from '@modules/tasks/dtos/IFindAllTaskByTechnicianDTO';

class TasksRepository implements ITasksRepository {

  private tasks: Task[] = [];

  public async create({
    technician_id,
    summary,
    date
  }: ICreateTaskDTO): Promise<Task> {
    const task = new Task();

    Object.assign(task, { technician_id, summary, date });

    this.tasks.push(task);

    return task;
  }

  public async update({ summary, date, id }: Task): Promise<Task> {
    const index_task = this.tasks.findIndex(task => task.id === id);

    const task = this.tasks[index_task];

    this.tasks[index_task] = { ...task, summary, date };

    return this.tasks[index_task];
  }
  
  public async delete(id: number): Promise<number> {
    const index_task = this.tasks.findIndex(task => task.id === id);

    this.tasks.splice(index_task, 1);

    return 1;
  }

  public async findOne(id: number): Promise<Task | undefined> {
    const task = this.tasks.find(task => task.id === id);

    return task;
  }

  public async findAllByManager({ manager_id }: IFindAllTaskByManagerDTO): Promise<Task[]> {
    const tasks = this.tasks.filter(task => task.technician.manager_id === manager_id);

    return tasks;
  }

  public async findAllByTechnician({ technician_id }: IFindAllTaskByTechnicianDTO): Promise<Task[]> {
    const tasks = this.tasks.filter(task => task.technician_id === technician_id);

    return tasks;
  }
}

export default TasksRepository;
