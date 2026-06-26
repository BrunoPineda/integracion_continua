import type { NewProduct, Product } from '../models/product';
import type { DatabaseFileRepository } from './database';

// S - Single Responsibility: este repositorio solo persiste y lee productos.
export class ProductRepository {
  // D - Dependency Inversion: recibe la base de datos desde afuera.
  constructor(private readonly database: DatabaseFileRepository) {}

  // I - Interface Segregation: metodo pequeno para consumidores que solo necesitan lectura.
  async getAll(): Promise<Product[]> {
    const data = await this.database.read();
    return data.products;
  }

  // O - Open/Closed: se puede cambiar la forma de generar IDs o persistir sin tocar servicios/controladores.
  // I - Interface Segregation: metodo pequeno para consumidores que solo necesitan crear productos.
  async create(product: NewProduct): Promise<Product> {
    const data = await this.database.read();
    const nextId = data.products.length > 0 ? Math.max(...data.products.map((item) => item.id)) + 1 : 1;
    const newProduct: Product = { id: nextId, ...product };
    data.products.push(newProduct);
    await this.database.write(data);
    return newProduct;
  }
}
