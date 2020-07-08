const fs = require('fs');
const path = require('path');
const {npmGlobalModules, yarnGlobalModules, supportGlobalResolving} = require('./global-resolver');

const globalModulesPath = npmGlobalModules() || yarnGlobalModules() || '';

function getGlobalConfig({
		search = [
			globalModulesPath,
			path.join(globalModulesPath, '@enact', 'cli', 'node_modules')
		],
		ruleset = 'enact'
	} = {}
) {
	if (globalModulesPath) {
		// Locate ESLint root package level from active main module
		const eslintPath = path.join(globalModulesPath, 'eslint')


		// ESLint's module resolver file
		const resolverFile = path.join(eslintPath, 'lib', 'shared', 'relative-module-resolver.js');

		if (fs.existsSync(resolverFile)) {
			// Find first global search path containing eslint-config-enact
			const dir = search.find(d => fs.existsSync(path.join(d, 'eslint-config-enact')));
			if (dir) supportGlobalResolving(resolverFile, dir);
		}
		// If eslint/lib/shared/relative-module-resolver.js does not exist, then
		// our global resolving support cannot be patched in.
		// As a meaningful fallback, and to backward-support ESLint <=5.x, still
		// should extend the desired ruleset.
		return {extends: ruleset};
	}
}

module.exports = {
	getGlobalConfig
};
