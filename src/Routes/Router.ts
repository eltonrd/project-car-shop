import { Router } from 'express';
import Controller from '../controllers/index';

export default class CustomRouter <T> {
  public router: Router;

  constructor() {
    this.router = Router();
  }

  public addRouter(
    controller: Controller<T>,
    route: string = controller.route,
  ) {
    this.router.post(route, controller.create);
    this.router.get(route, controller.read);
    this.router.get(`${route}/:id`, controller.readOne);
    this.router.put(`${route}/:id`, controller.update);
    this.router.delete(`${route}/:id`, controller.delete);
  }
}
