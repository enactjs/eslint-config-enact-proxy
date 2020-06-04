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
		} else {
			// If eslint/lib/shared/relative-module-resolver.js does not exist, then our
			// config is guaranteed to not (currently) resolve plugins/presets/parser
			// correctly.
			// Can be considered a fatal error. Rather than throw an error and have an
			// unhelpful stack output, more direct/developer-friendly to handle here.
			console.error('ERROR: Unable to setup support for global relative pathing.');
			try {
				const version = require(path.join(eslintPath, 'package.json')).version;
				console.error('Incompatible version of ESLint: ' + version);
			} catch (e) {
				console.error('Unable to find ESLint');
			}
			process.exit(1);
		}
		return {extends: ruleset};
	}
}

module.exports = {
	getGlobalConfig
};
