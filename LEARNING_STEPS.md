# Claude Code Learning Steps

1. Ask Claude Code to read `CLAUDE.md` and explain the request flow without changing code.
2. Ask why the service/repository layers do not directly import Redis.
3. Add a small feature such as task priority and ask Claude Code to update tests.
4. Review `git diff` before accepting changes.
5. Run `npm test` and use Claude Code to diagnose failures.
6. Ask for a senior Node.js architecture review before any refactor.

Claude Code is a development assistant in this repository; it is not part of the application runtime.
