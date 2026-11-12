const cp = require('child_process');
const path = require('path');

// Would have preferred to use https://github.com/sindresorhus/import-global/
// However due to a known limitation, it may return incorrect value in certain
// scenarios in Yarn. See https://github.com/sindresorhus/global-dirs/issues/13

const execSync = cmd => {
	try {
		const opts = {
			cwd: process.cwd(),
			env: process.env,
			encoding: 'utf8',
			windowsHide: true,
			stdio: 'pipe'
		};
		return cp.execSync(cmd, opts).trim() || null;
	} catch (e) {
		return null;
	}
};

const npmGlobalModules = () => execSync('npm root -g');

const yarnGlobalModules = () => {
	const dir = execSync('yarn global dir');
	return dir ? path.join(dir, 'node_modules') : null;
};

// Default npm global location, for editors started without `npm` in their PATH.
const defaultGlobalModules = () => {
	if (process.platform === 'win32') {
		return process.env.APPDATA ? path.join(process.env.APPDATA, 'npm', 'node_modules') : null;
	}
	return path.join(path.dirname(process.execPath), '..', 'lib', 'node_modules');
};

module.exports = {
	npmGlobalModules,
	yarnGlobalModules,
	defaultGlobalModules
};
