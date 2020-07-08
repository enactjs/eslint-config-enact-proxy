const cp = require('child_process');

// Would have preferred to use https://github.com/sindresorhus/import-global/
// However due to a known limitation, it may return incorrect value in certain
// scenarios in Yarn. See https://github.com/sindresorhus/global-dirs/issues/13

const execSync = cmd => {
	try {
		const opts = {
			cwd: process.cwd(),
			env: process.env,
			encoding: 'utf8',
			windowsHide: true
		}
		return cp.execSync(cmd, opts).trim();
	} catch(e) {
		return null;
	}
};

const npmGlobalModules = () => execSync('npm root -g');

const yarnGlobalModules = () => execSync('yarn global dir');

const supportGlobalResolving = (resolverFile, globalPath) => {
	const resolver = require(resolverFile);
	const doResolve = resolver.resolve;
	resolver.resolve = function(moduleName, relativeToPath) {
		try {
			// attempt normal resolving to support local & overrides
			return doResolve.call(resolver, moduleName, relativeToPath);
		} catch (e) {
			// support global-relative path resolving
			return doResolve.call(resolver, moduleName, globalPath);
		}
	};
};

module.exports = {
	npmGlobalModules,
	yarnGlobalModules,
	supportGlobalResolving
};
