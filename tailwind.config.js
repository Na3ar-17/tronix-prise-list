/** @type {import('tailwindcss').Config} */
export default {
	content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
	theme: {
		extend: {},
		screens: {
			lg: { max: '980px' },
			md: { max: '940px' },
		},
	},
	plugins: [],
}
