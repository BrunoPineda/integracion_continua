// S - Single Responsibility: este modelo solo describe la forma de un usuario.
// L - Liskov Substitution: cualquier objeto que cumpla esta forma puede usarse como User.
export interface User {
  id: number;
  username: string;
  password: string;
  name: string;
}
