# Change Log

The following is a curated list of changes in the Enact proxy ESLint config:

## [unreleased]

### Added

- `eslint` as a peer dependency, so ESLint is installed in the project and editors (VS Code, WebStorm automatic configuration) lint without extra settings.

### Changed

- The proxy to export an ESLint flat config for ESLint 9 and later, loaded from the globally-installed `eslint-config-enact` (standalone or bundled with `@enact/cli`). Use it from `eslint.config.js` instead of `eslintConfig` in `package.json`.

### Removed

- Support for ESLint 8 and older (`.eslintrc` / `eslintConfig`). Use `eslint-config-enact-proxy@1` for those.
- `semver` dependency.

## [1.0.9] (February 18, 2025)

* Updated dependencies.

## [1.0.8] (July 24, 2024)

* Updated dependencies.

## [1.0.7] (September 27, 2023)

* Updated dependencies.

## [1.0.6] (July 3, 2023)

* Updated dependencies.

## [1.0.5] (May 30, 2022)

### Fixed

- Updated the `lockfileVersion` of npm-shrinkwrap file to v2.

## [1.0.4] (April 11, 2022)

### Fixed

- Applied the new API to call ESLint module resolver correctly with the latest eslint.

## [1.0.3] (December 28, 2021)

No significant changes.

## [1.0.2]

### Fixed

- ESLint module resolver path to resolve correctly with the latest eslint.

## [1.0.1]

### Fixed

- CLI-based ESLint plugins/parser to be resolved correctly

## [1.0.0]

* Initial release with default and strict mode
