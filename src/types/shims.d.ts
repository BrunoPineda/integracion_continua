/* eslint-disable @typescript-eslint/no-explicit-any */
/**
 * Shims de tipos para módulos que no tienen declaraciones @types disponibles.
 * El uso de `any` aquí es intencional — son declaraciones de módulos externos.
 */

declare const process: {
  cwd(): string;
  env: Record<string, string | undefined>;
  stdout: { write(text: string): void };
};

declare module 'fs' {
  export const promises: {
    readFile(path: string, encoding: string): Promise<string>;
    writeFile(path: string, data: string, encoding: string): Promise<void>;
  };
}

declare module 'path' {
  export function resolve(...paths: string[]): string;
}

declare module 'express' {
  export interface Request {
    body: Record<string, unknown>;
    headers: Record<string, string | undefined>;
  }

  export interface Response {
    json(value: unknown): Response;
    status(code: number): Response;
  }

  export interface Router {
    get(path: string, handler: (...args: any[]) => void): Router;
    post(path: string, handler: (...args: any[]) => void): Router;
  }

  export function Router(): Router;

  const express: {
    (): any;
    json(): any;
  };

  export default express;
}

declare module 'cors' {
  const cors: () => any;
  export default cors;
}
