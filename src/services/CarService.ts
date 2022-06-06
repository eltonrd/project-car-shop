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
}
