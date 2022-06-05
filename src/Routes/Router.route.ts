import { Router } from 'express';
import Controller from '../controllers/index';

export default class CustomRouter<T> {
  public route: Router;

  constructor() {
    this.route = Router();
  }

  public createRoute(
    controller: Controller<T>,
    route: string = controller.route,
  ) {
    this.route.post(route, controller.create);
  }
}