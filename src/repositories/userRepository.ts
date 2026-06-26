import type { User } from '../models/user';
import type { DatabaseFileRepository } from './database';

// S - Single Responsibility: este repositorio solo busca usuarios por credenciales.
export class UserRepository {
  // D - Dependency Inversion: recibe la base de datos desde afuera.
  constructor(private readonly database: DatabaseFileRepository) {}

  // I - Interface Segregation: expone solo la busqueda que necesita AuthService.
  async findByCredentials(username: string, password: string): Promise<User | null> {
    const data = await this.database.read();
    return data.users.find((user) => user.username === username && user.password === password) ?? null;
  }
}
