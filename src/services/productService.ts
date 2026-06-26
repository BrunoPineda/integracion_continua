import type { NewProduct, Product } from '../models/product';
import type { ProductRepository } from '../repositories/productRepository';

// S - Single Responsibility: este servicio centraliza la logica de productos.
// O - Open/Closed: se pueden agregar reglas de negocio aqui sin modificar los controladores.
export class ProductService {
  // L - Liskov Substitution: cualquier repositorio con el mismo contrato de productos podria reemplazar al actual.
  constructor(private readonly productRepository: ProductRepository) {}

  // I - Interface Segregation: para listar solo se usa la operacion de lectura.
  getAll(): Promise<Product[]> {
    return this.productRepository.getAll();
  }

  // I - Interface Segregation: para crear solo se usa la operacion de escritura necesaria.
  create(product: NewProduct): Promise<Product> {
    return this.productRepository.create(product);
  }
}
