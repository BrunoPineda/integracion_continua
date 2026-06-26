// S - Single Responsibility: este modelo solo describe la forma de un producto.
// L - Liskov Substitution: cualquier objeto que cumpla esta forma puede usarse como Product.
export interface Product {
  id: number;
  name: string;
  price: number;
  stock: number;
}

export type NewProduct = Omit<Product, 'id'>;
