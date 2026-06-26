import type { UserRepository } from '../repositories/userRepository';
import type { User } from '../models/user';

interface LoginResult {
  token: string;
  user: Pick<User, 'id' | 'name' | 'username'>;
}

// S - Single Responsibility: este servicio solo valida credenciales y arma la respuesta de login.
export class AuthService {
  // D - Dependency Inversion: el repositorio llega desde afuera y el servicio no sabe como se guardan los usuarios.
  constructor(private readonly userRepository: UserRepository) {}

  // I - Interface Segregation: el login solo necesita buscar usuarios por credenciales.
  async login(username: string, password: string): Promise<LoginResult> {
    const user = await this.userRepository.findByCredentials(username, password);

    if (!user) {
      throw new Error('Credenciales inválidas');
    }

    return {
      token: 'demo-token',
      user: {
        id: user.id,
        name: user.name,
        username: user.username,
      },
    };
  }
}
