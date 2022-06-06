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
  }
}
