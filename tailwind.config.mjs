const disabledCss = {
    'code::before': false,
    'code::after': false,
    'blockquote p:first-of-type::before': false,
    'blockquote p:last-of-type::after': false,
    pre: false,
    code: false,
    'pre code': false
};

/** @type {import('tailwindcss').Config} */
export default {
    darkMode: 'class',
    content: ['./src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}'],
    theme: {
        extend: {
            colors: {
                'dark-bg': '#171717',
            },
            typography: (theme) => ({
                DEFAULT: { css: { ...disabledCss, '--tw-prose-body': theme('colors.dark-bg') } },
                sm: { css: { ...disabledCss, '--tw-prose-body': theme('colors.dark-bg') } },
                lg: { css: { ...disabledCss, '--tw-prose-body': theme('colors.dark-bg') } },
                xl: { css: { ...disabledCss, '--tw-prose-body': theme('colors.dark-bg') } },
                '2xl': { css: { ...disabledCss, '--tw-prose-body': theme('colors.dark-bg') } }
            })
        }
    },
    plugins: [require('@tailwindcss/typography')]
};
