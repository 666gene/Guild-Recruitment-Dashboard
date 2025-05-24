# Lowcalibre Guild Recruitment Portal

This project is a recruitment dashboard for the Lowcalibre guild. The frontend is built with **React** and **TypeScript** using [Vite](https://vitejs.dev/). An **Express** API backed by **SQLite** handles authentication and stores applications.

## Getting Started

1. Install dependencies (requires Node.js 18+):

```bash
npm install
```

2. Start the development server:

```bash
npm run dev
```

3. In a separate terminal, start the API server:

```bash
npm run server
```

The app will be available at `http://localhost:5173` by default.

## Available Scripts

- `npm run dev` – start the Vite development server
- `npm run server` – start the Express API server
- `npm run build` – create a production build in the `dist` folder
- `npm run preview` – preview the production build locally
- `npm test` – run unit tests with [Vitest](https://vitest.dev/)
- `npm run lint` – lint the codebase using ESLint

## Notes

The API server stores data in a local SQLite database located at `guild.db`. In production you may wish to migrate this to PostgreSQL or another managed service.
