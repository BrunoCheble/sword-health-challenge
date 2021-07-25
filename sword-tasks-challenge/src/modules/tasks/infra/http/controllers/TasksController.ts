import { Request, Response } from 'express';
import { container } from 'tsyringe';

import CreateTaskService from '@modules/tasks/services/CreateTaskService';
import UpdateTaskService from '@modules/tasks/services/UpdateTaskService';
import DeleteTaskService from '@modules/tasks/services/DeleteTaskService';
import ListTaskService from '@modules/tasks/services/ListTaskService';
import SendNotificationService from '@modules/tasks/services/SendNotificationService';

export default class TasksController {

  public async index(request: Request, response: Response): Promise<Response> {
    const listTaskService = container.resolve(ListTaskService);
        
    const user_id = parseInt(request.query.user_id.toString());

    const tasks = await listTaskService.execute({
      user_id
    });

    return response.json(tasks);
  }

  public async delete(request: Request, response: Response): Promise<Response> {
    const deleteTaskService = container.resolve(DeleteTaskService);
    
    const id = parseInt(request.params.id);
    const user_id = parseInt(request.query.user_id.toString());

    const deleted_task = await deleteTaskService.execute({
      id,
      user_id
    });

    return response.json(deleted_task);
  }

  public async create(request: Request, response: Response): Promise<Response> {
    const createTaskService = container.resolve(CreateTaskService);
    const sendNotificationService = container.resolve(SendNotificationService);

    const { summary, date } = request.body;
    const { user_id } = request.query;
    const technician_id = parseInt(user_id.toString());
    
    const task = await createTaskService.execute({
      technician_id,
      summary,
      date
    });
    
    sendNotificationService.execute({ id: task.id, user_id: technician_id });
    
    return response.json(task);
  }

  public async update(request: Request, response: Response): Promise<Response> {
    const updateTaskService = container.resolve(UpdateTaskService);
    
    const id = parseInt(request.params.id);
    const { user_id } = request.query;
    const { summary, date } = request.body;
    const technician_id = parseInt(user_id.toString());

    const task = await updateTaskService.execute({
      id,
      technician_id,
      summary,
      date
    });

    return response.json(task);
  }
}