const fs = require('fs');
const path = require('path');
const {npmGlobalModules, yarnGlobalModules, supportGlobalResolving} = require('./global-resolver');

// Find first parent module from the accessing ESLint.
const parentOf = m => Object.values(require.cache).filter(c => c.children.includes(m))[0];
const eslintParent = parentOf(parentOf(module));

// Detect NPM and Yarn global node_modules locations and attempt to find an active entry.
const globalPaths = [npmGlobalModules(), yarnGlobalModules()].filter(Boolean);
const activeGlobalPath = globalPaths.find(d =>
	eslintParent.path.startsWith(fs.realpathSync(path.dirname(d)))
);

// Use base global node_modules location and <global>/@enact/cli/node_modules as the default
// search locations.
const defaultSearch = (activeGlobalPath ? [activeGlobalPath] : globalPaths)
	.reduce((acc, dir) => (acc.concat(dir, path.join(dir, '@enact', 'cli', 'node_modules'))), [])
	.filter(dir => fs.existsSync(dir));

function getGlobalConfig({
		search = defaultSearch,
		ruleset = 'enact'
	} = {}
) {
	// Locate ESLint module resolver file.
	const eslintResolverPath = search
		.map(dir => path.join(dir, 'eslint', 'lib', 'shared', 'relative-module-resolver.js'))
		.find(dir => fs.existsSync(dir));
	if (eslintResolverPath) {
		supportGlobalResolving(eslintResolverPath, search);
	}
	// If eslint/lib/shared/relative-module-resolver.js does not exist, then
	// our global resolving support cannot be patched in.
	// As a meaningful fallback, and to backward-support ESLint <=5.x, still
	// should extend the desired ruleset.
	return {extends: ruleset};
}

module.exports = {
	getGlobalConfig
};
