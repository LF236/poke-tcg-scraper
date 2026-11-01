# Pokémon TCG Deal Finder

Bot que monitoriza Amazon MX, Mercado Libre MX y eBay para encontrar ofertas en productos sellados de Pokémon TCG. Registra historial de precios y notifica por Telegram cuando detecta descuentos.

**Solo productos sellados** — no cartas individuales.

## Stack

- **Runtime:** Bun
- **API:** NestJS 12
- **DB:** PostgreSQL + TypeORM
- **Notificaciones:** Telegram Bot API
- **Frontend:** Next.js (fase 4)
- **Infraestructura:** Docker

## Setup

```bash
# Dependencias
bun install

# Copia variables de entorno
cp .env.example .env
# Edita .env con tus credenciales

# Levanta PostgreSQL
docker compose up -d postgres

# Desarrollo
bun run start:dev
```

## Comandos

```bash
bun run start:dev          # dev con hot reload
bun run build              # compilar
bun run start:prod         # producción

bun run test               # unit tests
bun run test:e2e           # e2e tests
bun run test:cov           # cobertura

bun run migration:generate -- src/database/migrations/NombreMigracion
bun run migration:run
bun run migration:revert
```

## Variables de entorno

Ver [`.env.example`](.env.example).

## APIs externas

| Servicio | Docs |
|---|---|
| Mercado Libre | https://developers.mercadolibre.com.mx |
| eBay Browse | https://developer.ebay.com/api-docs/buy/static/api-browse.html |
| Telegram Bot | https://core.telegram.org/bots/api |
| Amazon PA API | https://afiliados.amazon.com.mx (fase 3) |
