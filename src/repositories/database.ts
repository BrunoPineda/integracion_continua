import { promises as fs } from 'fs';
import path from 'path';

interface DatabaseShape {
  users: Array<{ id: number; username: string; password: string; name: string }>;
  products: Array<{ id: number; name: string; price: number; stock: number }>;
}

const dbPath = path.resolve('db.json');

// S - Single Responsibility: esta clase solo lee y escribe el archivo de datos.
// D - Dependency Inversion: concentra el acceso a fs para que repositorios y servicios no dependan de fs directamente.
export class DatabaseFileRepository {
  async read(): Promise<DatabaseShape> {
    try {
      const content = await fs.readFile(dbPath, 'utf-8');
      return JSON.parse(content) as DatabaseShape;
    } catch {
      return { users: [], products: [] };
    }
  }

  async write(data: DatabaseShape): Promise<void> {
    await fs.writeFile(dbPath, JSON.stringify(data, null, 2), 'utf-8');
  }
}
