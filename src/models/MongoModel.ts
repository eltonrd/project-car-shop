import { Model as M, Document } from 'mongoose';
import { Model } from '../interfaces/ModelInterface';

abstract class MongoModel<T> implements Model<T> {
  constructor(protected model: M<T & Document>) {}

  create = async (obj: T): Promise<T> => 
    this.model.create({ ...obj });

  read = async (): Promise<T[]> => 
    this.model.find();

  readOne = async (id: string): Promise<T | null> => 
    this.model.findOne({ id });

  // Referencia para solucionar o erro "Argument of type 'T' is not assignable to parameter..."
  // Setando como opcional todas as propriedades do objeto do tipo T
  // https://www.typescriptlang.org/docs/handbook/utility-types.html
  update = async (id: string, obj: Partial<T>): Promise<T | null> => 
    this.model.findByIdAndUpdate(id, obj, { new: true });

  delete = async (id: string): Promise<T | null> => 
    this.model.findOneAndDelete({ id });
}

export default MongoModel;