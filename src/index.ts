import express, { type Application, type Request, type Response } from 'express';
import cors from 'cors';
import { AuthController } from './controllers/authController';
import { ProductController } from './controllers/productController';
import { DatabaseFileRepository } from './repositories/database';
import { ProductRepository } from './repositories/productRepository';
import { UserRepository } from './repositories/userRepository';
import { AuthService } from './services/authService';
import { ProductService } from './services/productService';

// D - Dependency Inversion: el punto de entrada arma el sistema e inyecta las dependencias.
const app: Application = express();
app.use(cors());
app.use(express.json());

const database = new DatabaseFileRepository();
// L - Liskov Substitution: si otra clase mantiene el mismo comportamiento que los repositorios, podria ocupar este lugar.
const authController = new AuthController(new AuthService(new UserRepository(database)));
const productController = new ProductController(new ProductService(new ProductRepository(database)));

app.get('/health', (_request: Request, response: Response) => {
  response.json({ ok: true, architecture: 'solid' });
});

app.post('/auth/login', authController.login);
app.get('/products', productController.list);
app.post('/products', productController.create);

const port = Number(process.env['PORT'] ?? 3002);

app.listen(port, () => {
  process.stdout.write(`SOLID API running on http://localhost:${port}\n`);
});
