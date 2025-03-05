const eslintEnactProxy = require('./strict');
const { FlatCompat } = require("@eslint/eslintrc");

const compat = new FlatCompat({});
console.log(eslintEnactProxy);
module.exports = [
	...eslintEnactProxy,
];