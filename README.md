# Full-stack React + Go Projekt

Tento projekt je full-stack eshop využívající Go pro backend a React pro front-end

## Použité technologie

### Frontend

- **React** (v19) - JavaScriptová knihovna pro tvorbu uživatelských rozhraní
- **TypeScript** - Typový systém pro JavaScript
- **Vite** (v6) - Moderní build tool a dev server
- **TanStack Router** (v1) - Typově bezpečný router pro React aplikace
- **TanStack Query** (v5) - Knihovna pro správu, cachování a synchronizaci serverového stavu
- **Tailwind CSS** (v4) - Efektivní CSS framework
- **Axios** - HTTP klient pro API požadavky
- **Zod** - Schema validační knihovna

### Backend

- **Go** - Programovací jazyk pro backend
- **Gin** - Webový framework pro Go
- **MongoDB** - NoSQL databáze

## Struktura projektu

### Frontend (`/frontend`)

- `/src` - Hlavní složka se zdrojovým kódem
  - `/api` - API endpointy pro komunikaci s backendem
  - `/components` - Znovupoužitelné React komponenty
  - `/routes` - Definice routingu a stránek aplikace
  - `/types` - TypeScript typy pro API volání
- `/public` - Statické soubory

### Backend (`/backend`)

- `/cmd/api` - Vstupní bod API aplikace
- `/config` - Konfigurační soubory
- `/internal` - Interní balíčky aplikace
  - `/api`
    - `/handlers` - HTTP handlery pro zpracování requestů
    - `/middleware` - Middleware funkce
    - `/routes` - Definice API endpointů
  - `/database` - Databázová vrstva a MongoDB konfigurace
  - `/models` - Datové modely (Product, Category, Variant)
  - `/service` - Business logika
- `/pkg` - Sdílené balíčky, které mohou být použity jinými aplikacemi

## Předpoklady

Pro spuštění projektu potřebujete mít nainstalované:

- [Node.js (v18+)](https://nodejs.org/en/download)
- [pnpm](https://pnpm.io/installation)
- [Go (v1.21+)](https://go.dev/dl/)
- [MongoDB (v7+)](https://www.mongodb.com/try/download/community)
- [Git](https://git-scm.com/downloads)

## Spuštění projektu

### Frontend

```bash
cd frontend
pnpm install
pnpm dev
```

### Backend

```bash
cd backend
go mod download
go run cmd/api/main.go
```

Server běží na `http://localhost:8080`
Frontend aplikace běží na `http://localhost:5173`

### Vývojové příkazy

#### Frontend

```bash
# Spuštění vývojového serveru
pnpm dev

# Build pro produkci
pnpm build

# Lint
pnpm lint

# Preview buildu
pnpm preview
```

#### Backend

```bash
# Spuštění vývojového serveru
go run cmd/api/main.go

# Spuštění testů
go test ./...

# Build
go build -o app cmd/api/main.go
```
