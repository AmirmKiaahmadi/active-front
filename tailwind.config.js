/** @type {import('tailwindcss').Config} */
module.exports = {
	content: [
		'./index.html',
		'./src/**/*.{js,ts,jsx,tsx}',
		'./node_modules/tw-elements/dist/js/**/*.js',
	],
	theme: {
		extend: {
			transitionProperty: {
				height: 'height',
				spacing: 'margin, padding',
			},
		},
		colors: {
			primary: '#001689',
			green: '#34B12C',
			blue: '#3344FF',
			error: '#FF671D',
			gray: '#ADB5BD',
			gray2: '#F0F1F2',
			white: '#ffffff',
		},
	},
	plugins: [],
};
