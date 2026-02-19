# AI Context for react-native-storage-inspector

Guidance for AI assistants (Cursor, Claude, Copilot, etc.) when using or modifying this library.

## Quick Reference

| File                               | Purpose                                              |
| ---------------------------------- | ---------------------------------------------------- |
| [RULES.md](RULES.md)               | Hard rules: imports, strings, components, etc.       |
| [ARCHITECTURE.md](ARCHITECTURE.md) | File structure, data flow, adapter pattern           |
| [GUIDE.md](GUIDE.md)               | Development patterns, common tasks, storage behavior |

## Must-Know

1. **Imports:** Use `@/` alias; no relative paths across dirs.
2. **Strings:** All UI text in `src/strings.ts`.
3. **Components:** Reuse `IconButton`, `ItemRowActions`; extract shared UI.
4. **Constants:** Layout values in `src/constants.ts` (`LAYOUT`).
5. **Adapters:** New storage = new `IStorageAdapter` in `src/adapters/`.

Read [RULES.md](RULES.md) before editing. Use [ARCHITECTURE.md](ARCHITECTURE.md) and [GUIDE.md](GUIDE.md) for context on structure and patterns.
