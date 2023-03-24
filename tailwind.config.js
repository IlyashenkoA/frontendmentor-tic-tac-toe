/** @type {import('tailwindcss').Config} */
module.exports = {
	content: ['./src/**/*.{js,jsx,ts,tsx}'],
	theme: {
		colors: {
			darkNavy: '#1A2A33',
			semiDarkNavy: '#1F3641',
			silver: '#A8BFC9',
			silverHover: '#DBE8ED',
			lightBlue: '#31C3BD',
			lightBlueHover: '#65E9E4',
			lightYellow: '#F2B137',
			lightYellowHover: '#FFC860',
		},
		fontFamily: {
			outfit: ['Outfit', 'sans-serif'],
		},
		extend: {},
	},
	plugins: [],
};
