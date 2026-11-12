const fs = require('fs');
const path = require('path');
const {npmGlobalModules, yarnGlobalModules, defaultGlobalModules} = require('./global-resolver');

const CONFIG_PACKAGE = 'eslint-config-enact';

// Returns the `node_modules` directories that contain the ESLint package(s) currently loaded in
// this process. When the proxy is loaded by `enact lint --local`, this is the `@enact/cli`
// `node_modules` directory, which also holds the matching `eslint-config-enact`.
function loadedESLintModules () {
	const dirs = new Set();
	Object.keys(require.cache).forEach(id => {
		const match = /^(.*[\\/]node_modules)[\\/]eslint[\\/]lib[\\/]/.exec(id);
		if (match) dirs.add(match[1]);
	});
	return [...dirs];
}

// Lazily yields the global `node_modules` directories to search. Spawning `npm`/`yarn` is slow,
// so these are only computed when nothing was found locally.
function * globalModules () {
	const seen = new Set();
	for (const getRoot of [npmGlobalModules, yarnGlobalModules, defaultGlobalModules]) {
		const root = getRoot();
		if (root && !seen.has(root)) {
			seen.add(root);
			yield path.join(root, '@enact', 'cli', 'node_modules');
			yield root;
		}
	}
}

function * searchDirs () {
	yield * loadedESLintModules();
	yield * globalModules();
}

function findConfig (file) {
	const request = `${CONFIG_PACKAGE}/${file}`;

	// Attempt normal resolving first to support a locally-installed `eslint-config-enact`.
	try {
		return require.resolve(request, {paths: [process.cwd(), module.path]});
	} catch (e) {
		// Not installed locally; continue with the global search.
	}

	for (const dir of searchDirs()) {
		const candidate = path.join(dir, CONFIG_PACKAGE, `${file}.js`);
		if (fs.existsSync(candidate)) return candidate;
	}

	return null;
}

function getGlobalConfig ({ruleset = 'index'} = {}) {
	const configPath = findConfig(ruleset);

	if (!configPath) {
		throw new Error(
			`eslint-config-enact-proxy: Unable to find "${CONFIG_PACKAGE}". ` +
			'Install @enact/cli (or eslint-config-enact) globally, e.g. "npm install -g @enact/cli".'
		);
	}

	const config = require(configPath);

	if (!Array.isArray(config)) {
		throw new Error(
			`eslint-config-enact-proxy: "${configPath}" is not an ESLint flat config. ` +
			'Update the global @enact/cli (or eslint-config-enact) to a version based on ESLint 9 or later.'
		);
	}

	return config;
}

module.exports = {
	getGlobalConfig
};
