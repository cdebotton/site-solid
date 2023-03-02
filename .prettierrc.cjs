/** @type {import('prettier').Config} */
module.exports = {
	useTabs: true,
	singleQuote: true,
	trailingComma: 'all',
	plugins: [require('prettier-plugin-tailwindcss')],
};
