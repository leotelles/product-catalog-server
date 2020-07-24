import { Router } from 'express';
import ProductController from './app/controllers/ProductController';

const routes = new Router();

routes.get('/products', ProductController.index);
routes.post('/products', ProductController.store);
routes.put('/products/:id', ProductController.update);
routes.delete('/products/:id', ProductController.delete);

export default routes;
