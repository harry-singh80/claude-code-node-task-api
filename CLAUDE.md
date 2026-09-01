# Claude Code Project Instructions

This repository is a learning project for using Claude Code with a Node.js backend.

## Stack
- Node.js
- Express.js
- TypeScript
- Zod validation
- Jest + Supertest
- In-memory Map storage by default
- Optional Redis storage

## Architecture
Keep the code separated into routes, controllers, services, repositories, storage adapters, validation, and middleware.

## Coding rules
- Use TypeScript strict mode.
- Prefer async/await.
- Keep controllers thin.
- Put business logic in services.
- Use AppError for expected HTTP errors.
- Add or update Jest tests when changing API behavior.
- Do not add a real SQL/NoSQL database to this demo.
- Keep Redis optional; the application must run without Redis.

## Useful Claude Code tasks
- Explain the architecture before making changes.
- Add a `priority` field with validation and tests.
- Add filtering by `completed=true|false`.
- Review the API for error-handling problems.
- Run tests and fix failures.
