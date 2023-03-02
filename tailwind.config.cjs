const plugin = require('tailwindcss/plugin');
const kebab = require('kebab-case');
const radix = require('@radix-ui/colors');

/** @type {import('tailwindcss').Config} */
module.exports = {
	content: ['./src/**/*.{tsx,css}'],
	future: {
		hoverOnlyWhenSupported: true,
	},
	theme: {
		colors: Object.fromEntries(
			Object.entries(radix)
				.filter(([k]) => !k.endsWith('A'))
				.flatMap(([color, weights]) => {
					return Object.entries(weights).map(([weight, hsl]) => {
						return [`${kebab(color)}-${weight.match(/(\d+)$/)[0]}`, hsl];
					});
				}),
		),
		extend: {
			keyframes: {
				'bg-scroll-x': {
					from: {
						backgroundPosition: '0vw 0vh',
					},
					to: {
						backgroundPosition: '-300vw 0vh',
					},
				},
			},
		},
	},
	plugins: [
		require('@tailwindcss/container-queries'),
		require('@tailwindcss/forms'),
		require('@tailwindcss/typography'),
		plugin(({ addVariant }) => {
			addVariant('vapor', '[data-mode="VAPORWAVE"] &');
			addVariant('eva', '[data-mode="EVA-02"] &');
		}),
	],
};
