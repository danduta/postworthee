# Postworthee

**Postworthee** is a full-stack demo web application for a photo sharing service. Built with a modern monorepo architecture, it uses Next.js and TypeScript across both frontend and backend, with PostgreSQL for data storage and Amazon S3 for handling image uploads. Authentication is handled via Firebase Auth, while shared schema types and API clients are reused across the stack for consistency and type safety.

## 📸 Features

- **Photo Upload & Sharing**: Upload photos to S3, organize them into memories, and share them with others.
- **Authentication**: Firebase Auth (Google sign-in) for user login and identity management.
- **PostgreSQL Database**: All application data is persisted in a Postgres database, with a clear schema separation.
- **S3 Image Storage**: Photos are stored in Amazon S3 for scalability and reliability.
- **Type-safe API Layer**: Common schemas and generated API clients are used both on frontend and backend for strict type safety.
- **Monorepo Architecture**: Modular structure with shared code using `pnpm` workspaces.
- **Full Docker Support**: Easily spin up a dev environment using Docker and Docker Compose.

## 🛠️ Technologies Used

- **Frontend**: [Next.js](https://nextjs.org/), [React](https://reactjs.org/)
- **Backend**: [Node.js](https://nodejs.org/), [Express](https://expressjs.com/)
- **Database**: [PostgreSQL](https://www.postgresql.org/)
- **Authentication**: [Firebase Auth](https://firebase.google.com/products/auth)
- **Storage**: [Amazon S3](https://aws.amazon.com/s3/)
- **DevOps**: Docker, Docker Compose, GitHub Actions
- **Package Management**: [pnpm](https://pnpm.io/)

## 📦 Getting Started

### Prerequisites

- Node.js (v16+)
- pnpm (v7+)
- Docker + Docker Compose
- Firebase project (for Auth)
- AWS S3 bucket

### Installation

1. **Clone the repository**:

   ```bash
   git clone https://github.com/danduta/postworthee.git
   cd postworthee
   ```

2. **Install dependencies**:

   ```bash
   pnpm install
   ```

3. **Set up environment variables**:

   Create `.env.local` files in each app with credentials for Firebase, S3, and Postgres.

4. **Run with Docker**:

   ```bash
   docker-compose up --build
   ```

   Visit `http://localhost:3000` to view the app.

## 🧱 Project Structure

```
postworthee/
├── apps/                 # Frontend & backend apps (e.g. web, api)
├── packages/             # Shared modules: db client, schema types, API clients
├── .github/              # CI/CD workflows
├── docker-compose.yaml   # Local development setup
├── firebase.json         # Firebase auth config
├── pnpm-workspace.yaml   # Monorepo setup
└── tsconfig.base.json    # Shared TypeScript config
```

## 🤝 Contributing

This is a demo project, but feel free to fork and extend it. PRs are welcome if you spot issues or want to improve the design.

## 📄 License

MIT License.
