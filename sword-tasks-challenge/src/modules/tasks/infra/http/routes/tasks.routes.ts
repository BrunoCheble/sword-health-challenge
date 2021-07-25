import { Router } from 'express';
import { celebrate, Joi } from 'celebrate';

import TasksController from '../controllers/TasksController';

const tasksRouter = Router();
const tasksController = new TasksController();

tasksRouter.post('/',
celebrate({
  body: {
    summary: Joi.string().required(),
    date: Joi.date(),
  },
}),
tasksController.create);

tasksRouter.put('/:id',
celebrate({
  body: {
    summary: Joi.string().required(),
    date: Joi.date(),
  },
}),
tasksController.update);

tasksRouter.get('/', tasksController.index);

tasksRouter.delete('/:id', tasksController.delete);

export default tasksRouter;
