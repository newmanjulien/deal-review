# Deal Review

Dashboard shell built with Next.js App Router.

## Getting started

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

## Where to edit

- App routes live in `src/app`.
- The root dashboard redirect is `src/app/(dashboard)/page.tsx`.
- Main canvas content for "Since last meeting" is `src/app/(dashboard)/since-last-meeting/page-client.tsx`.
- Shared canvas layout components live in `src/components/canvas`.

## Quality checks

```bash
npm run lint
npm run typecheck
npm run test
npm run build
```
