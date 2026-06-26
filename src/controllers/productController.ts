import type { Request, Response } from 'express';
import type { ProductService } from '../services/productService';

// S - Single Responsibility: este controlador solo maneja requests de productos.
export class ProductController {
  // D - Dependency Inversion: depende del servicio que recibe por constructor.
  constructor(private readonly productService: ProductService) {}

  // I - Interface Segregation: esta accion solo usa la operacion de listado que necesita.
  list = async (_request: Request, response: Response): Promise<void> => {
    response.json(await this.productService.getAll());
  };

  // I - Interface Segregation: esta accion solo usa la operacion de creacion que necesita.
  create = async (request: Request, response: Response): Promise<void> => {
    if (request.headers['authorization'] !== 'Bearer demo-token') {
      response.status(401).json({ message: 'Debes iniciar sesión primero' });
      return;
    }

    const body = request.body as { name: string; price: string | number; stock: string | number };
    const product = await this.productService.create({
      name: body.name,
      price: Number(body.price),
      stock: Number(body.stock),
    });

    response.status(201).json(product);
  };
}
