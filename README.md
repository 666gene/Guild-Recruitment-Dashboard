# Lowcalibre Guild Recruitment Portal

This is a minimal prototype for the Lowcalibre guild recruitment app. It uses a small Node.js server with no external dependencies.

## Setup

```bash
npm install # not required, but kept for compatibility
```

### Environment Variables
Copy `.env.example` to `.env` and fill in values.

```
BLIZZARD_CLIENT_ID=your_client_id
BLIZZARD_CLIENT_SECRET=your_client_secret
```

## Development

Start the dev server:

```bash
npm start
```

Seed the database with dummy applicants:

```bash
node scripts/seed.js
```

Open <http://localhost:3000> in your browser.

## Testing and Linting

```bash
npm run lint && npm run test
```

## API
See `openapi.yaml` for the API specification.

## Deployment
This project is a placeholder. For production consider deploying the Node server to a VPS or container platform.
