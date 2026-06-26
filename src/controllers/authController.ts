import type { Request, Response } from 'express';
import type { AuthService } from '../services/authService';

// S - Single Responsibility: este controlador solo traduce HTTP a una llamada de login.
export class AuthController {
  // D - Dependency Inversion: recibe el servicio desde afuera en vez de crearlo internamente.
  constructor(private readonly authService: AuthService) {}

  login = async (request: Request, response: Response): Promise<void> => {
    try {
      const body = request.body as { username: string; password: string };
      const result = await this.authService.login(body.username, body.password);
      response.json(result);
    } catch (error) {
      response.status(401).json({ message: error instanceof Error ? error.message : 'Error de login' });
    }
  };
}
