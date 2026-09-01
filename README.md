# Claude Code + Node.js Task API

A small backend project for learning **Claude Code** with a real Node.js codebase. The application itself does **not** call Claude at runtime. Claude Code is used as a development agent to understand the repository, edit files, run commands, write tests, refactor code, and review changes.

## What this project includes

- Node.js
- Express.js
- TypeScript
- CRUD REST APIs
- In-memory `Map` storage by default
- Optional Redis storage
- Zod request validation
- Centralized error handling
- Jest + Supertest API tests
- Dockerfile
- Docker Compose with Redis
- `CLAUDE.md` instructions for Claude Code

## Architecture

```text
HTTP Request
   |
   v
Route -> Validation -> Controller -> Service -> Repository -> Storage
                                                        |-> In-memory Map
                                                        |-> Redis (optional)
```

The important learning point is that Redis and in-memory storage implement the same `TaskStorage` interface. The service layer does not need to know which storage technology is active.

## Project structure

```text
src/
  controllers/
  middleware/
  models/
  repositories/
  routes/
  services/
  storage/
  validation/
tests/
CLAUDE.md
Dockerfile
docker-compose.yml
```

## Run locally with in-memory storage

```bash
npm install
npm run dev
```

The API starts at:

```text
http://localhost:3000
```

Because `REDIS_URL` is empty, the app uses an in-memory JavaScript `Map`. Data disappears when the application restarts.

## Run with Redis

Start a local Redis server and set:

```bash
REDIS_URL=redis://localhost:6379
npm run dev
```

Or use Docker Compose:

```bash
docker compose up --build
```

The application tries Redis when `REDIS_URL` is configured. If Redis cannot be reached during startup, it falls back to in-memory storage.

## API endpoints

| Method | Endpoint | Description |
|---|---|---|
| GET | `/health` | Health check |
| GET | `/api/tasks` | List tasks |
| GET | `/api/tasks/:id` | Get one task |
| POST | `/api/tasks` | Create task |
| PUT | `/api/tasks/:id` | Update task |
| DELETE | `/api/tasks/:id` | Delete task |

### Create a task

```bash
curl -X POST http://localhost:3000/api/tasks \
  -H "Content-Type: application/json" \
  -d '{"title":"Learn Claude Code","description":"Practice repository-level AI coding"}'
```

Example response:

```json
{
  "success": true,
  "data": {
    "id": "generated-uuid",
    "title": "Learn Claude Code",
    "description": "Practice repository-level AI coding",
    "completed": false,
    "createdAt": "2026-09-01T00:00:00.000Z",
    "updatedAt": "2026-09-01T00:00:00.000Z"
  }
}
```

### Update a task

```bash
curl -X PUT http://localhost:3000/api/tasks/TASK_ID \
  -H "Content-Type: application/json" \
  -d '{"completed":true}'
```

## Validation

`POST /api/tasks` requires:

- `title`: 1-100 characters
- `description`: optional, maximum 500 characters
- `completed`: optional boolean

Invalid input returns HTTP `400`.

## Error handling

Expected errors use a shared `AppError` class and centralized Express error middleware.

Example 404:

```json
{
  "success": false,
  "error": {
    "message": "Task not found"
  }
}
```

## Tests

Tests use in-memory storage, so Redis is not required.

```bash
npm test
```

Also run:

```bash
npm run typecheck
npm run build
```

## How Claude Code is used

Claude Code is a development tool in this repository. It is not an Express middleware and it is not imported into the runtime code.

A typical workflow is:

```text
Developer
   |
   v
Claude Code CLI
   |
   +--> reads CLAUDE.md
   +--> examines repository files
   +--> proposes/edits code
   +--> runs npm test / npm run typecheck
   +--> explains changes
   |
   v
Developer reviews git diff and commits
```

### Good Claude Code prompts for this repository

Start by asking Claude Code to understand the code rather than immediately generating features:

```text
Read CLAUDE.md and analyze this repository.
Explain the request flow from route to storage.
Do not change any files yet.
```

Then try a small feature:

```text
Add a priority field to Task.
Allowed values: low, medium, high.
Default: medium.
Update validation, service logic and Jest tests.
Run the tests after making the changes.
```

Then ask it to review its own work:

```text
Review the changes you just made.
Look for TypeScript problems, duplicated logic, missing validation,
and missing test cases. Do not change files until you explain the issues.
```

Another useful exercise:

```text
Add GET /api/tasks?completed=true support.
Keep controllers thin and put filtering logic in the correct layer.
Add tests and run them.
```

For debugging practice:

```text
Run the test suite.
If a test fails, explain the root cause before fixing it.
Make the smallest safe change and rerun the tests.
```

For code review practice:

```text
Review this project like a senior Node.js engineer.
Focus on architecture, validation, error handling, async behavior,
Redis usage and testability. Give findings before editing anything.
```

## Suggested Git learning history

Instead of committing all AI-generated work at once, make small reviewed commits:

```text
chore: initialize TypeScript Express API
feat: add task CRUD with in-memory storage
feat: add optional Redis storage adapter
feat: add Zod validation and error handling
test: add task API integration tests
docs: add Claude Code workflow and CLAUDE.md
```

This demonstrates that Claude Code was used as an engineering assistant while you still reviewed and controlled the codebase.

## Ideas for the next Claude Code exercises

1. Add task priority.
2. Add completed-status filtering.
3. Add pagination without a database.
4. Add request logging.
5. Add rate limiting.
6. Improve test coverage.
7. Ask Claude Code to identify security and architecture issues.
8. Ask it to refactor a feature while keeping tests green.

## Important distinction

**Claude Code** works on your repository during development. It can read/edit files and run development commands.

This project intentionally does not integrate the Claude API or any LLM call into the running application. Its purpose is to learn Claude Code itself.

## Next.js frontend / CORS

The backend allows browser requests from the frontend origin configured by `CORS_ORIGIN`.
The local default is:

```text
http://localhost:3001
```

To override it:

```bash
CORS_ORIGIN=https://your-frontend.example.com npm run dev
```
