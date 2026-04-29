# Finance Alchemist – Klientsky portál

Klientsky portál pre Finance Alchemist (financealchemist.sk).

Stack: Next.js 14 (App Router), Clerk (email + heslo), Neon (PostgreSQL),
Drizzle ORM, Tailwind CSS. Deploy na Vercel.

## Premenné prostredia

V `.env.local` (alebo v Vercel Project Settings) je potrebné nastaviť:

- `NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY` – Clerk Publishable Key
- `CLERK_SECRET_KEY` – Clerk Secret Key
- `DATABASE_URL` – Neon Postgres connection string (s `?sslmode=require`)

Voliteľné Clerk redirect premenné nájdete v `.env.example`.

## Migrácie databázy

```bash
npm run db:migrate
```

Generovanie nových migrácií zo schema súboru:

```bash
npm run db:generate
```

## Nastavenie prvého admin používateľa

1. Používateľ sa najprv musí prihlásiť cez `/login`. Pri prvej návšteve
   `/dashboard` sa automaticky vytvorí záznam v tabuľke `users`
   (rola `client`, `client_id` = NULL).
2. V Neon SQL editore spustite:

   ```sql
   UPDATE users SET role = 'admin' WHERE email = 'your@email.com';
   ```

3. Po obnovení stránky bude mať používateľ prístup do `/admin`.

## Priradenie klienta používateľovi

V `/admin` vytvorte klienta. Následne v Neon SQL editore prepojte
používateľa:

```sql
UPDATE users SET client_id = '<client-uuid>' WHERE email = 'user@example.com';
```

## Lokálny vývoj

```bash
npm install
npm run db:migrate
npm run dev
```

Aplikácia beží na `http://localhost:3000`.
