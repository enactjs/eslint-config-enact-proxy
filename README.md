# eslint-config-enact-proxy

> A minimal local proxy config to load globally-installed Enact ESLint rules.

Standalone "ESLint config" package which acts as a dynamic forwarder, searching for a global `@enact/cli` install or a global `eslint-config-enact` install, and exporting the [flat config](https://eslint.org/docs/latest/use/configure/configuration-files) from there. This is *not* needed for the `enact lint` command and is primarily designed for `eslint` and in-editor linting usage.

`eslint-config-enact` is searched for in this order:

1. A locally-installed `eslint-config-enact` (resolved from the current directory).
2. Next to the ESLint package that is loading the config (for example, `@enact/cli/node_modules` when ESLint comes from `@enact/cli`).
3. The global npm and Yarn `node_modules` directories, including `@enact/cli/node_modules`.

## Installation

`eslint-config-enact-proxy` should be installed locally on a project.  It will expect `eslint-config-enact` or `@enact/cli` to be installed globally.

```sh
npm install --save-dev eslint-config-enact-proxy
```

`eslint` is a peer dependency, so npm (7 or later) also installs ESLint itself into the project's `node_modules`. Editors and the `eslint` command use this local ESLint, while the rules, plugins and parsers still come from the global `@enact/cli` (or `eslint-config-enact`), so they stay in sync with `enact lint`. With Yarn 1, which does not install peer dependencies, also run `yarn add --dev eslint`.

> **NOTE**: Version 2.x requires ESLint 9 or later (flat config). For ESLint 8 and older (`.eslintrc` or `eslintConfig` in `package.json`), use version 1.x.

## Usage

Create an `eslint.config.js` file in the project's root:

```js
module.exports = require('eslint-config-enact-proxy');
```

For strict mode, use `eslint-config-enact-proxy/strict`. If the project's `package.json` has `"type": "module"`, use ESM instead:

```js
export {default} from 'eslint-config-enact-proxy/strict';
```

To add project-specific settings, spread the proxy config into your own config array:

```js
const enact = require('eslint-config-enact-proxy/strict');

module.exports = [
	...enact,
	{
		ignores: ['docs/']
	}
];
```

## In-editor linting

Because ESLint is installed in the project, editors pick up the project's ESLint and `eslint.config.js` without any extra settings.

### Visual Studio Code

Install the [ESLint extension](https://marketplace.visualstudio.com/items?itemName=dbaeumer.vscode-eslint) (v3 or later).

### WebStorm

Go to *Settings* > *Languages & Frameworks* > *JavaScript* > *Code Quality Tools* > *ESLint* and select *Automatic ESLint configuration*.

For more information, please see the [Enact ESLint config docs](https://github.com/enactjs/eslint-config-enact/blob/master/docs/index.md).

## Copyright and License Information

Unless otherwise specified, all content, including all source code files and
documentation files in this repository are:

Copyright (c) 2020-2022 LG Electronics

Unless otherwise specified or set forth in the NOTICE file, all content,
including all source code files and documentation files in this repository are:
Licensed under the Apache License, Version 2.0 (the "License");
you may not use this content except in compliance with the License.
You may obtain a copy of the License at

http://www.apache.org/licenses/LICENSE-2.0

Unless required by applicable law or agreed to in writing, software
distributed under the License is distributed on an "AS IS" BASIS,
WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
See the License for the specific language governing permissions and
limitations under the License.
