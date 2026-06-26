# SOLID API

API simple de productos con login básico usando TypeScript y `db.json` como base local.

## Qué hace

- expone `POST /auth/login`
- expone `GET /products`
- expone `POST /products`
- divide responsabilidades en modelos, repositorios, servicios y controladores

## Ventaja de usar JSON Server o `db.json`

- acelera el desarrollo inicial
- permite un almacenamiento muy simple para pruebas
- ayuda a probar cambios sin una base real
- deja visible la estructura de datos

## Comentario de la arquitectura

SOLID ayuda a que cada clase tenga una responsabilidad clara y hace más fácil reemplazar piezas sin romper el resto del sistema.

## Que letra de SOLID aplica cada parte

- `S - Single Responsibility`: `AuthController`, `ProductController`, `AuthService`, `ProductService`, `UserRepository` y `ProductRepository` tienen una sola responsabilidad cada uno.
- `O - Open/Closed`: `ProductService` y los repositorios estan listos para crecer con nuevas reglas o nuevas fuentes de datos sin reescribir la API completa.
- `L - Liskov Substitution`: los servicios consumen contratos simples y cualquier implementacion que respete el mismo comportamiento podria reemplazarse sin romper el flujo.
- `I - Interface Segregation`: la app esta dividida en piezas pequenas; cada clase usa solo lo que necesita en vez de depender de una interfaz gigante.
- `D - Dependency Inversion`: `index.ts` arma el sistema inyectando `DatabaseFileRepository` en `UserRepository` y `ProductRepository`, y luego estos en servicios y controladores.

## Resumen rapido

La idea principal es que cada capa conoce solo la siguiente dependencia que necesita y no toda la aplicacion completa.
