import { Vehicle } from './VehicleInterface';

export interface Car extends Vehicle {
  doorsQty: number,
  seatsQty: number,
}