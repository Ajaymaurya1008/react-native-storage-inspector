---
sidebar_position: 5
---

# Theme and strings

The inspector uses a small **theme** object and **strings** for labels and messages. They are exported in case you need to reference them (e.g. for consistency with your app); the component does not currently accept theme or string overrides as props.

## theme

```ts
import { theme } from 'react-native-storage-inspector';
```

Typical shape (see package types for full `Theme`):

- **colors:** e.g. `background`, `text`, `textMuted`, `border`, `inverted` used for background, text, borders, and FAB.
- Used by the built-in styles for the list, sections, and refresh button.

## strings

```ts
import { strings } from 'react-native-storage-inspector';
```

Contains UI copy such as:

- Message when no adapter is available (e.g. "No storage adapter available").
- Section and button labels used inside the inspector.

Use these if you build custom UI that should match the inspector’s wording, or for tests. The exact keys are defined in the package; check `dist` or source for the full list.
