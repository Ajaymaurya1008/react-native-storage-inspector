# Commits and releases

This project uses three tools so that **every commit follows a standard format** and **releases (version bump + npm publish) happen automatically** from those commits. Below is what each tool does, why it’s there, and how it’s set up.

---

## 1. Commitizen (guided commits)

### What it is

Commitizen is a CLI that asks you a few questions and then writes the commit message for you in **Conventional Commits** format. You don’t have to remember the format or type it by hand.

### Why it’s needed

- Commits need to follow a **fixed format** so that:
  - **Commitlint** can check them.
  - **semantic-release** can decide the next version (major/minor/patch) from the types of commits since the last release.
- Commitizen makes it easy to produce valid messages every time (type, scope, short description, optional body/footer) without memorizing rules.

### How it’s done

- **Dependencies:** `commitizen` and `cz-conventional-changelog` (adapter that uses the Conventional Changelog convention).
- **Script:** In `package.json`, the `"commit": "cz"` script runs the Commitizen CLI.
- **Config:** In `package.json`, `config.commitizen.path` points to `cz-conventional-changelog` so `cz` uses that adapter.

**Usage:**

```bash
# Instead of: git commit -m "fix bug"
npm run commit
```

You’ll be prompted for:

1. **Type** – e.g. `feat`, `fix`, `docs`, `chore`, `refactor`, `perf`, `test`.
2. **Scope** (optional) – e.g. `mmkv`, `keychain`, `ui`.
3. **Short description** – one line, imperative (“add X” not “added X”).
4. **Body** (optional) – longer explanation.
5. **Breaking change?** (optional) – if yes, triggers a **major** version bump.
6. **Issues closed** (optional) – e.g. “Closes #123”.

The result is a message like:

```
feat(keychain): deduplicate keychain services

Filter duplicate services returned by getAllGenericPasswordServices
so the UI shows each key once.
```

That format is exactly what Commitlint validates and what semantic-release uses.

---

## 2. Commitlint (enforce format)

### What it is

Commitlint checks that **commit messages** match the configured rules (e.g. Conventional Commits). If the message is invalid, the commit is rejected.

### Why it’s needed

- Without enforcement, people (including you) will sometimes commit with free-form messages like `"wip"` or `"fix"`. semantic-release can’t infer version bumps from those, and the changelog would be inconsistent.
- Commitlint runs **before** the commit is created (via the **commit-msg** Git hook), so bad messages never enter history.

### How it’s done

- **Dependencies:** `@commitlint/cli` and `@commitlint/config-conventional` (rule set for Conventional Commits).
- **Config file:** `commitlint.config.js` at the repo root:
  - `extends: ['@commitlint/config-conventional']` – enables rules for type, scope, subject, body, footer, etc.
  - `'header-max-length': [2, 'always', 100]` – first line of the message must be ≤ 100 characters. `2` = error (reject), `'always'` = apply always.
- **When it runs:** The **Husky** hook at `.husky/commit-msg` runs:

  ```bash
  npx --no -- commitlint --edit $1
  ```

  Git passes the path to the temporary file that contains the commit message; Commitlint reads that file and validates it. If validation fails, the process exits with a non-zero code and Git aborts the commit.

**Valid message shape:**

```
<type>(<scope>): <subject>

[optional body]

[optional footer]
```

- **Type:** `feat`, `fix`, `docs`, `style`, `refactor`, `perf`, `test`, `build`, `ci`, `chore`, etc.
- **Scope:** optional; what part of the repo (e.g. `keychain`, `mmkv`).
- **Subject:** required; short summary, imperative, no period at the end.

If you use `npm run commit` (Commitizen), the generated message will satisfy Commitlint.

---

## 3. semantic-release (auto version + publish)

### What it is

semantic-release **automates** the release process:

1. Looks at all commits since the last release (or since the beginning).
2. Determines the **next version number** (major / minor / patch) from commit types and breaking changes.
3. Generates **release notes** and updates **CHANGELOG.md**.
4. Updates **package.json** version.
5. Commits those changes, creates a **git tag** (e.g. `v1.2.0`), and pushes.
6. **Publishes** the package to npm.

No manual version bumping or `npm publish` is required.

### Why it’s needed

- **Consistency:** Version and changelog always reflect what’s in the commits (fix → patch, feat → minor, breaking → major).
- **No human error:** You can’t forget to bump version or update the changelog; the tool does it from the same commits that trigger the release.
- **Traceability:** Each release is a tag; the commit that creates the tag contains the exact package.json and CHANGELOG for that release.

### How version is decided

semantic-release uses the **Conventional Commits** types (the same format Commitizen and Commitlint use):

| Commit type                                                 | Version bump          | When                                         |
| ----------------------------------------------------------- | --------------------- | -------------------------------------------- |
| `fix`, `perf`                                               | **Patch**             | 1.0.0 → 1.0.1                                |
| `feat`                                                      | **Minor**             | 1.0.0 → 1.1.0                                |
| `BREAKING CHANGE` or `feat!:` / `fix!:`                     | **Major**             | 1.0.0 → 2.0.0                                |
| `docs`, `chore`, `style`, `refactor`, `test`, `ci`, `build` | **None** (no release) | Only if there are other commits that do bump |

So: **only `feat` and `fix` (and breaking changes) drive a release**; the type in the commit message directly controls the next version.

### How it’s done in this repo

- **Config:** `.releaserc.cjs`
  - **branches:** `['main']` – releases only from the `main` branch.
  - **plugins** (in order):
    1. **commit-analyzer** – reads commits, decides next version (patch/minor/major).
    2. **release-notes-generator** – turns commits into release notes text.
    3. **@semantic-release/changelog** – writes/updates `CHANGELOG.md`.
    4. **@semantic-release/npm** – updates `version` in `package.json` only (`npmPublish: false`; see below).
    5. **@semantic-release/git** – commits `CHANGELOG.md` and `package.json`, creates the tag (e.g. `v1.2.0`), and pushes. The commit message uses `[skip ci]` so the push doesn’t trigger the release workflow again in a loop.
    6. **@semantic-release/exec** – on success, runs `npm publish --provenance --access public` so publishing uses **OIDC** (no token).

- **Where it runs:** In CI (GitHub Actions), not locally by default.
- **Workflow:** `.github/workflows/publish.yml` (named “Release”):
  - **Trigger:** `push` to `main`.
  - **Environment:** Node.js 24, GitHub-hosted runner.
  - **Steps:** Checkout (with `fetch-depth: 0` so semantic-release sees full history), install deps, format check, test, build, then **`npx semantic-release`**.
  - **Publishing:** Uses [npm trusted publishing (OIDC)](https://docs.npmjs.com/trusted-publishers#supported-cicd-providers) – no token. The workflow does **not** set `registry-url` (that would create an `.npmrc` using `NODE_AUTH_TOKEN` and cause 401). `@semantic-release/npm` is used with `npmPublish: false` so it does not run `npm whoami` (which does not work with OIDC). The actual publish is done by `@semantic-release/exec` via `npm publish --provenance --access public`, which uses OIDC when no token is present.

- **If you see 401 or EINVALIDNPMTOKEN:** Remove **NPM_TOKEN** and **NODE_AUTH_TOKEN** from the repo’s **Settings → Secrets and variables → Actions**. With trusted publishing, no token must be used; OIDC is used instead.

So the flow is:

1. You merge (or push) to `main` with commits like `feat(keychain): deduplicate services` and `fix(ui): header overflow`.
2. The Release workflow runs.
3. semantic-release analyzes those commits → e.g. one `feat` and one `fix` → next version is **minor** (e.g. 1.0.3 → 1.1.0).
4. It updates `CHANGELOG.md`, bumps `package.json`, commits, tags `v1.1.0`, pushes, and publishes to npm.

### Running semantic-release locally

- **Dry run (no push, no publish):**

  ```bash
  npx semantic-release --dry-run
  ```

  This shows what version would be chosen and what would be published, without changing the repo or npm.

- **Real run (only if you have push and npm access):**

  ```bash
  npm run release
  ```

  Normally you rely on CI to run this after pushes to `main`; you only need to run it locally in special cases (e.g. fixing a failed release).

---

## Summary

| Tool                 | Role                                                                                                                   |
| -------------------- | ---------------------------------------------------------------------------------------------------------------------- |
| **Commitizen**       | Helps you write commits in Conventional Commits format via `npm run commit`.                                           |
| **Commitlint**       | Enforces that format on every commit (via Husky `commit-msg` hook).                                                    |
| **semantic-release** | On push to `main`, reads those commits, bumps version, updates CHANGELOG and package.json, tags, and publishes to npm. |

Together they give you: **guided commits → enforced format → automatic version and publish** with no manual release steps.
