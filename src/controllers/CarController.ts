import { Request, Response } from 'express';
import Controller, { RequestWithBody, ResponseError } from '.';
import CarService from '../services/CarService';
import { Car } from '../interfaces/CarInterface';

export default class CarController extends Controller<Car> {
  private $route: string;

  constructor(
    public service = new CarService(),
    route = '/cars',
  ) {
    super(service);
    this.$route = route;
  }

  get route() {
    return this.$route;
  }

  create = async (
    req: RequestWithBody<Car>,
    res: Response<Car | ResponseError>,
  ): Promise<typeof res> => {
    const { body } = req;
    try {
      const carCreated = await this.service.create(body);
      if (!carCreated) {
        return res.status(500).json({ error: this.error.internal });
      }
      if ('error' in carCreated) {
        return res.status(400).json(carCreated);
      }
      return res.status(201).json(carCreated);
    } catch (error) {
      return res.status(500).json({ error: this.error.internal });
    }
  };

  read = async (
    _req: Request,
    res: Response<Car[] | ResponseError>,
  ): Promise<typeof res> => {    
    try {
      const data = await this.service.read();
      if (!data) {
        return res.status(500).json({ error: this.error.internal });
      }
      return res.status(200).json(data);
    } catch (err) {
      return res.status(500).json({ error: this.error.internal });
    }
  };
}