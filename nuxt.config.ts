// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
    css: ['~/assets/styles/main.scss'],
    runtimeConfig: {
        public: {
            apiUrl: process.env.AUTH_API_URL,
            appUrl: process.env.APP_URL,
            cookieDomain: process.env.COOKIE_DOMAIN,
        }
    },
})
