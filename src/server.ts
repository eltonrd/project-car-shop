import App from './app';
import CustomRouter from './Routes/Router.route';
import CarController from './controllers/car.controller';
import { Car } from './interfaces/CarInterface';

const server = new App();

const carController = new CarController();

const carRouter = new CustomRouter<Car>();
carRouter.createRoute(carController);
server.addRouter(carRouter.route);
export default server;
