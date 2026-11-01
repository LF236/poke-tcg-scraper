# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project

Pokémon TCG sealed products deal finder. Monitors Amazon MX, Mercado Libre MX, and eBay for sealed product deals (booster boxes, ETBs, bundles, etc.), stores price history, and sends Telegram alerts when discounts are detected.

**No individual card tracking** — exclusively sealed, original products.

## Stack

| Layer | Tech |
|---|---|
| Runtime | Bun |
| Language | TypeScript |
| API | NestJS |
| Database | PostgreSQL |
| ORM | TypeORM |
| Validation | Zod |
| Scheduler | @nestjs/schedule |
| Notifications | Telegram Bot API |
| Frontend | Next.js (separate app) |
| Infrastructure | Docker |

## Commands

```bash
# Scaffold (one-time) — bunx falla con Node.js v25, usar npx
npx @nestjs/cli new . --package-manager bun --skip-git --language TypeScript

# Install dependencies
bun install

# Development
bun run start:dev

# Build
bun run build

# Run built app
bun run start:prod

# Tests
bun test                          # all tests
bun test src/path/to/file.spec.ts # single file

# Database migrations
bun run migration:generate -- src/database/migrations/MigrationName
bun run migration:run
bun run migration:revert

# Docker (local dev)
docker compose up -d postgres     # start only DB
docker compose up -d              # full stack
```

## Architecture

Clean Architecture / SOLID. Each module follows the same layout:

```
<module>/
├── application/
│   ├── dtos/
│   └── use-cases/
├── domain/
│   ├── entities/
│   └── ports/            # interfaces (abstract classes)
├── infrastructure/
│   └── orm/typeorm/      # entity + repository impl
├── interface/            # controllers / REST types
└── <module>.module.ts
```

### Modules

```
src/
├── catalog/              # Expansions & sealed products catalog
├── marketplace/          # Adapters: MercadoLibre, eBay, Amazon
│   └── infrastructure/
│       └── adapters/
│           ├── mercadolibre/
│           └── ebay/
├── listing/              # Marketplace listings & price history
├── deal/                 # Deal detection engine
├── notification/         # Telegram alerts
├── scheduler/            # Cron orchestration
└── database/
    └── migrations/
```

### Core data flow

```
Scheduler → SearchOrchestrator → MarketplaceAdapters
                                        ↓
                              Normalization & ProductMatching
                                        ↓
                              Listing + PriceHistory persistence
                                        ↓
                              DealDetector → TelegramNotification
```

### Marketplace port

```typescript
// marketplace/domain/ports/marketplace-adapter.port.ts
abstract class MarketplaceAdapterPort {
  abstract search(query: string): Promise<MarketplaceProduct[]>;
  abstract getProduct(externalId: string): Promise<MarketplaceProduct | null>;
}
```

### Key domain concepts

- **Product**: canonical catalog entry (expansion + productType + language). The unit of comparison — only same-type products are compared against each other.
- **Listing**: a specific marketplace publication linked to a Product.
- **PriceObservation**: timestamped price snapshot for a Listing.
- **Deal**: detected discount, generated when total cost drops below reference price thresholds.

### Product types

`booster-pack` | `booster-bundle` | `booster-box` | `elite-trainer-box` | `collection-box` | `premium-collection` | `ultra-premium-collection` | `tin` | `mini-tin` | `blister` | `build-and-battle` | `special-collection`

### Deal thresholds (configurable)

| Level | Discount | Action |
|---|---:|---|
| Interesting | 10% | Log only |
| Featured | 20% | Telegram alert |
| Exceptional | 30% | Priority alert |

Total cost = price + shipping + taxes + applicable fees. International purchases also factor in currency conversion and import costs.

## Development phases

- **Phase 1 (MVP):** PostgreSQL setup, product/expansion catalog, Mercado Libre + eBay adapters, price history, Telegram alerts, basic deal detector.
- **Phase 2:** Name normalization, product matching, reference price engine, duplicate detection, confidence scoring.
- **Phase 3:** Amazon MX integration (conditioned on Product Advertising API access).
- **Phase 4:** Next.js admin panel — dashboard, catalog management, price charts, alert config.

## Search frequencies

| Job | Interval |
|---|---|
| Watched products | 10–15 min |
| General searches | 30–60 min |
| Reference price update | Daily |
| Deal verification | Before each notification |

## External APIs

- **Mercado Libre:** https://developers.mercadolibre.com.mx/
- **eBay Browse API:** https://developer.ebay.com/api-docs/buy/static/api-browse.html
- **Amazon Product Advertising API:** https://afiliados.amazon.com.mx/ (Phase 3, requires affiliate account)
- **Telegram Bot API:** https://core.telegram.org/bots/api

Amazon integration must use official API or authorized third-party — no unauthorized scraping or anti-restriction bypasses.
