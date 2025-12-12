/** @type {import('tailwindcss').Config} */
module.exports = {
    content: [
        './pages/**/*.{js,ts,jsx,tsx,mdx}',
        './components/**/*.{js,ts,jsx,tsx,mdx}',
        './app/**/*.{js,ts,jsx,tsx,mdx}',
    ],
    theme: {
        extend: {
            colors: {
                // Dr Lal PathLabs Blue
                primary: {
                    50: '#e8f4fc',
                    100: '#d1e9f9',
                    200: '#a3d3f3',
                    300: '#75bded',
                    400: '#47a7e7',
                    500: '#0D6EBF', // Primary Blue
                    600: '#0A5899',
                    700: '#084273',
                    800: '#052C4D',
                    900: '#031627',
                },
                // Dr Lal PathLabs Golden Yellow
                secondary: {
                    50: '#fef9e7',
                    100: '#fef3cf',
                    200: '#fce79f',
                    300: '#fbdb6f',
                    400: '#F9CF3F',
                    500: '#F4B942', // Main Golden Yellow
                    600: '#D4A038',
                    700: '#A47B2B',
                    800: '#74571E',
                    900: '#443311',
                },
                // Accent colors
                accent: {
                    blue: '#0D6EBF',
                    yellow: '#F4B942',
                    red: '#C62828',
                    green: '#2E7D32',
                    lightBlue: '#E3F2FD',
                    lightYellow: '#FFF8E1',
                },
                // UI colors
                dark: {
                    900: '#1A1A2E',
                    800: '#16213E',
                    700: '#0F3460',
                }
            },
            fontFamily: {
                sans: ['Inter', 'system-ui', 'sans-serif'],
            },
            backgroundImage: {
                'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
                'hero-pattern': 'linear-gradient(135deg, #0D6EBF 0%, #084273 100%)',
                'yellow-gradient': 'linear-gradient(135deg, #F4B942 0%, #D4A038 100%)',
            },
            boxShadow: {
                'glow': '0 0 20px rgba(13, 110, 191, 0.3)',
                'glow-yellow': '0 0 20px rgba(244, 185, 66, 0.4)',
            },
            animation: {
                'fade-in': 'fadeIn 0.5s ease-in-out',
                'slide-up': 'slideUp 0.5s ease-out',
                'pulse-slow': 'pulse 3s cubic-bezier(0.4, 0, 0.6, 1) infinite',
            },
            keyframes: {
                fadeIn: {
                    '0%': { opacity: '0' },
                    '100%': { opacity: '1' },
                },
                slideUp: {
                    '0%': { transform: 'translateY(20px)', opacity: '0' },
                    '100%': { transform: 'translateY(0)', opacity: '1' },
                },
            },
        },
    },
    plugins: [],
}

