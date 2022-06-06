import { Request, Response } from 'express';
import Service from '../services';

export type ResponseError = {
  error: unknown;
};

export interface RequestWithBody<T> extends Request {
  body: T;
}

enum ControllerErrors {
  internal = 'Internal Server Error',
  notFound = 'Object not found',
  requiredId = 'Id is required',
  badRequest = 'Bad request',
}

export default abstract class Controller<T> {
  abstract route:string;

  public error = ControllerErrors;

  constructor(protected service: Service<T>) {}

  public abstract create(
    req: RequestWithBody<T>,
    res: Response<T | ResponseError>,
  ): Promise<typeof res>;

  public async read(
    _req: Request,
    res: Response<T[] | ResponseError>,
  ): Promise<typeof res> {    
    try {
      const data = await this.service.read();
      if (!data) {
        return res.status(500).json({ error: this.error.internal });
      }
      return res.status(200).json(data);
    } catch (err) {
      return res.status(500).json({ error: this.error.internal });
    }
  }
}
