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
}
