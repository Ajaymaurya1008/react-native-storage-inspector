/**
 * semantic-release configuration.
 * See docs/RELEASES.md for how commits drive version and publishing.
 */
module.exports = {
  branches: ['main'],
  plugins: [
    '@semantic-release/commit-analyzer',
    {
      preset: 'conventionalcommits',
      releaseRules: [{ type: 'chore', scope: 'release', release: 'patch' }],
    },
    '@semantic-release/release-notes-generator',
    ['@semantic-release/changelog', { changelogFile: 'CHANGELOG.md' }],
    // npmPublish: false skips verifyConditions (npm whoami), which doesn't work with OIDC.
    ['@semantic-release/npm', { npmPublish: false }],
    [
      '@semantic-release/git',
      {
        assets: ['CHANGELOG.md', 'package.json'],
        message:
          'chore(release): ${nextRelease.version} [skip ci]\n\n${nextRelease.notes}',
      },
    ],
    // Run npm publish only when a release was created; uses OIDC (trusted publishing).
    [
      '@semantic-release/exec',
      { successCmd: 'npm publish --provenance --access public' },
    ],
  ],
};
