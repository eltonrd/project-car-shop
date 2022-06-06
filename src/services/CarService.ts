import Service, { ServiceError } from '.';
import CarModel from '../models/CarModel';
import CarInterface, { Car } from '../interfaces/CarInterface';

export default class CarService extends Service<Car> {
  constructor(model = new CarModel()) {
    super(model);
  }

  create = async (obj: Car): Promise<Car | ServiceError | null> => {
    const car = CarInterface.safeParse(obj);
    if (!car.success) {
      return { error: car.error };
    }
    return this.model.create(obj);
  };

  read = async (): Promise<Car[] | ServiceError | null> => this.model.read();

  readOne = async (id: string): Promise<Car | ServiceError | null> => 
    this.model.readOne(id);

  update = async (id: string, obj: Car): Promise<Car | ServiceError | null> => {
    const car = CarInterface.safeParse(obj);
    if (!car.success) {
      return { error: car.error };
    }
    return this.model.update(id, obj);
  };

  delete = async (id: string): Promise<Car | ServiceError | null> => 
    this.model.delete(id);
}
