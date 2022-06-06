import * as sinon from 'sinon';
import { expect } from 'chai';
import CarModel from '../../../models/CarModel';
import CarService from '../../../services/CarService';

const mockCar = {
  _id: "4edd40c86762e0fb12000003",
  model: "Ferrari Maranello",
  year: 1963,
  color: "red",
  buyValue: 3500000,
  seatsQty: 2,
  doorsQty: 2,
  status: true,
};

const mockCarList = [{
  _id: "4edd40c86762e0fb12000003",
  model: "Ferrari Maranello",
  year: 1963,
  color: "red",
  buyValue: 3500000,
  seatsQty: 2,
  doorsQty: 2,
  status: true,
},
{
  _id: "4edd40c86762e0fb12000004",
  model: "Buggati",
  year: 2020,
  color: "blue",
  buyValue: 1000000,
  seatsQty: 2,
  doorsQty: 2,
  status: true,
},
];

const carModel = new CarModel();
const carService = new CarService(carModel);

describe('CarService', () => {
  before(async()=> {
    sinon.stub(carService, 'create').resolves(mockCar);
    sinon.stub(carService, 'read').resolves(mockCarList);
    sinon.stub(carService, 'readOne').resolves(mockCar);
    sinon.stub(carService, 'update').resolves(mockCar);
    sinon.stub(carService, 'delete').resolves(mockCar);
});

  after(()=> {
    (carService.create as sinon.SinonStub).restore();
    (carService.read as sinon.SinonStub).restore();
    (carService.readOne as sinon.SinonStub).restore();
    (carService.update as sinon.SinonStub).restore();
    (carService.delete as sinon.SinonStub).restore();
  });

  it('should create a car', async()=> {
    const car = await carService.create(mockCar);
    expect(car).to.be.deep.equal(mockCar);
    expect(car).to.be.an('object');
    expect(car).to.have.property('_id');
    expect(car).to.have.property('model');
    expect(car).to.have.property('year');
    expect(car).to.have.property('color');
    expect(car).to.have.property('buyValue');
    expect(car).to.have.property('seatsQty');
    expect(car).to.have.property('doorsQty');
  });

  it('should create a car with a status', async()=> {
    const car = await carService.create({
      ...mockCar,
      status: true,
    });
    expect(car).to.be.deep.equal(mockCar);
    expect(car).to.be.an('object');
    expect(car).to.have.property('_id');
    expect(car).to.have.property('model');
    expect(car).to.have.property('year');
    expect(car).to.have.property('color');
    expect(car).to.have.property('buyValue');
    expect(car).to.have.property('seatsQty');
    expect(car).to.have.property('doorsQty');
    expect(car).to.have.property('status');
  });

  it('should read one car', async()=> {
    const car = await carService.readOne(mockCar._id);
    expect(car).to.be.deep.equal(mockCar);
    expect(car).to.be.an('object');
    expect(car).to.have.property('_id');
    expect(car).to.have.property('model');
    expect(car).to.have.property('year');
    expect(car).to.have.property('color');
    expect(car).to.have.property('buyValue');
    expect(car).to.have.property('seatsQty');
    expect(car).to.have.property('doorsQty');
    expect(car).to.have.property('status');
  });

  it('should update a car', async()=> {
    const car = await carService.update(mockCar._id, mockCar);
    expect(car).to.be.deep.equal(mockCar);
    expect(car).to.be.an('object');
    expect(car).to.have.property('_id');
    expect(car).to.have.property('model');
    expect(car).to.have.property('year');
    expect(car).to.have.property('color');
    expect(car).to.have.property('buyValue');
    expect(car).to.have.property('seatsQty');
    expect(car).to.have.property('doorsQty');
    expect(car).to.have.property('status');
  });

  it('should delete a car', async()=> {
    const car = await carService.delete(mockCar._id);
    expect(car).to.be.deep.equal(mockCar);
    expect(car).to.be.an('object');
    expect(car).to.have.property('_id');
    expect(car).to.have.property('model');
    expect(car).to.have.property('year');
    expect(car).to.have.property('color');
    expect(car).to.have.property('buyValue');
    expect(car).to.have.property('seatsQty');
    expect(car).to.have.property('doorsQty');
    expect(car).to.have.property('status');
  });
});