import ICreateTaskDTO from '../dtos/ICreateTaskDTO';
import IFindAllTaskByManagerDTO from '../dtos/IFindAllTaskByManagerDTO';
import IFindAllTaskByTechnicianDTO from '../dtos/IFindAllTaskByTechnicianDTO';
import Task from '../infra/typeorm/entities/Task';

export default interface ITasksRepository {
  create(data: ICreateTaskDTO): Promise<Task>;
  update(data: Task): Promise<Task>;
  delete(id: number): Promise<number>;
  findOne(id: number): Promise<Task | undefined>;
  findAllByManager(data: IFindAllTaskByManagerDTO): Promise<Task[]>;
  findAllByTechnician(data: IFindAllTaskByTechnicianDTO): Promise<Task[]>;
}
