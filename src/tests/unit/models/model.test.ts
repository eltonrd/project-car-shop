import { Model } from 'mongoose';
import Sinon, * as sinon from 'sinon';
import { expect } from 'chai';
import CarModel, { CarDocument } from '../../../models/CarModel';

const carMocked = new CarModel();
const spy = Sinon.spy();

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

const mockAttributes = {
  create: spy,
  find: spy,
  findOne: spy,
  findByIdAndUpdate: spy,
  findOneAndDelete: spy,
} as unknown as Model<CarDocument>;

const dbMocked = new CarModel(mockAttributes);

describe('CarModel', () => {
  before(async()=> {
    sinon.stub(carMocked, 'create').resolves(mockCar);
  });

  after(()=> {
    (carMocked.create as sinon.SinonStub).restore();
  });

  it('should create a car', async()=> {
    const car = await carMocked.create(mockCar);
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
    const car = await carMocked.create({
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
});

describe('CarModel Attributes', () => {
  it('should call the function create', async()=> {
    await dbMocked.create(mockCar);
    Sinon.assert.called(spy);
  });

  it('should call the function read', async()=> {
    await dbMocked.read();
    Sinon.assert.called(spy);
  });

  it('should call the function readOne', async()=> {
    await dbMocked.readOne(mockCar._id);
    Sinon.assert.called(spy);
  });

  it('should call the function update', async()=> {
    await dbMocked.update(mockCar._id, mockCar);
    Sinon.assert.called(spy);
  });

  it('should call the function delete', async()=> {
    await dbMocked.delete(mockCar._id);
    Sinon.assert.called(spy);
  });
});
