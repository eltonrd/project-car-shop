import * as sinon from 'sinon';
import chai from 'chai';
import chaiHttp = require('chai-http');
import server from '../../../server';
import CarService from '../../../services/CarService';

chai.use(chaiHttp);
const expect = chai.expect;
const carService = new CarService();

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

describe('CarController', () => {
  before(async()=> {
    sinon.stub(carService, 'create').resolves(mockCar);
    sinon.stub(carService, 'read').resolves([mockCar]);
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
    chai.request(server.app).get('/cars').send().end((_err, res) => {
      expect(res.status).to.equal(201);
      expect(res.body.data).to.deep.equal(mockCar);
    });
  });

  it('should read all cars', async()=> {
    chai.request(server.app).get('/cars').send().end((_err, res) => {
      expect(res.status).to.equal(200);
      expect(res.body.data).to.deep.equal([mockCar]);
    });
  });

  it('should read one car', async()=> {
    chai.request(server.app).get('/cars/4edd40c86762e0fb12000003').send().end((_err, res) => {
      expect(res.status).to.equal(200);
      expect(res.body.data).to.deep.equal(mockCar);
    });
  });

  it('should update a car', async()=> {
    chai.request(server.app).put('/cars/4edd40c86762e0fb12000003').send(mockCar).end((_err, res) => {
      expect(res.status).to.equal(200);
      expect(res.body.data).to.deep.equal(mockCar);
    });
  });

  it('should delete a car', async()=> {
    chai.request(server.app).delete('/cars/4edd40c86762e0fb12000003').send().end((_err, res) => {
      expect(res.status).to.equal(200);
      expect(res.body.data).to.deep.equal(mockCar);
    });
  });

  it('should return a 404 error', async()=> {
    chai.request(server.app).get('/cars/4edd40c86762e0fb12000004').send().end((_err, res) => {
      expect(res.status).to.equal(404);
    });
  });

  it('should return a 400 error', async()=> {
    chai.request(server.app).put('/cars/4edd40c86762e0fb12000004').send(mockCar).end((_err, res) => {
      expect(res.status).to.equal(400);
    });
  });

  it('should return a 400 error', async()=> {
    chai.request(server.app).delete('/cars/4edd40c86762e0fb12000004').send().end((_err, res) => {
      expect(res.status).to.equal(400);
    });
  });

  it('should return a 500 error', async()=> {
    (carService.create as sinon.SinonStub).rejects(new Error('Error'));
    chai.request(server.app).get('/cars').send().end((_err, res) => {
      expect(res.status).to.equal(500);
    });
  });

  it('should return a 500 error', async()=> {
    (carService.read as sinon.SinonStub).rejects(new Error('Error'));
    chai.request(server.app).get('/cars').send().end((_err, res) => {
      expect(res.status).to.equal(500);
    });
  });

  it('should return a 500 error', async()=> {
    (carService.readOne as sinon.SinonStub).rejects(new Error('Error'));
    chai.request(server.app).get('/cars/4edd40c86762e0fb12000003').send().end((_err, res) => {
      expect(res.status).to.equal(500);
    });
  });

  it('should return a 500 error', async()=> {
    (carService.update as sinon.SinonStub).rejects(new Error('Error'));
    chai.request(server.app).put('/cars/4edd40c86762e0fb12000003').send(mockCar).end((_err, res) => {
      expect(res.status).to.equal(500);
    });
  });

  it('should return a 500 error', async()=> {
    (carService.delete as sinon.SinonStub).rejects(new Error('Error'));
    chai.request(server.app).delete('/cars/4edd40c86762e0fb12000003').send().end((_err, res) => {
      expect(res.status).to.equal(500);
    });
  });
});
