const husky = require('husky');

husky.install('.husky');

husky.set('.husky/pre-commit', 'yarn lint && npx lint-staged');

husky.set('.husky/commit-msg', 'npx commitlint --edit $1');
