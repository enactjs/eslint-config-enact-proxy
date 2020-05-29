# eslint-config-enact-global

> A minimal local proxy config to load globally-installed Enact ESLint rules.

Standalone package which acts as a forwarder ESLint config, dynamically searching for `eslint-config-enact` global install or `@enact/cli` global install, and loading the rules/plugins/parser from there. This is *not* needed for `enact lint` command and is primarily targetted for `eslint` and in-editor linting usage.

## Usage

Reference this set of rules from your `.eslintrc` or `package.json` file and then use `eslint`.

For more information (including editor/IDE setup), please see the [docs](docs/index.md).

## Installation

`eslint-config-enact-global` should be installed locally on a project.  It will expect `eslint-config-enact` or `@enact/cli` to be installed globally.

## Copyright and License Information

Unless otherwise specified, all content, including all source code files and
documentation files in this repository are:

Copyright (c) 2020 LG Electronics

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
