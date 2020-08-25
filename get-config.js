const fs = require('fs');
const path = require('path');
const {npmGlobalModules, yarnGlobalModules, supportGlobalResolving} = require('./global-resolver');

const globalPaths = [npmGlobalModules(), yarnGlobalModules()].filter(Boolean);
const defaultSearch = globalPaths
	.reduce((acc, dir) => (acc.concat(dir, path.join(dir, '@enact', 'cli', 'node_modules'))), [])
	.filter(dir => fs.existsSync(dir));

function getGlobalConfig({
		search = defaultSearch,
		ruleset = 'enact'
	} = {}
) {
	// Locate ESLint module resolver file
	const eslintResolverPath = globalPaths
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
