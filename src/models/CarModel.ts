import { Schema, model as createdModel, Document } from 'mongoose';
import { Car } from '../interfaces/CarInterface';
import MongoModel from './MongoModel';

export interface CarDocument extends Car, Document { }

const CarSchema = new Schema<CarDocument>({
  model: String,
  year: Number,
  color: String,
  status: Boolean,
  buyValue: Number,
  doorsQty: Number,
  seatsQty: Number,
}, {
  versionKey: false,
});

export default class CarModel extends MongoModel<Car> {
  constructor(model = createdModel('Car', CarSchema)) {
    super(model);
  }
}
