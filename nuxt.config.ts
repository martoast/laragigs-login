// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
    ssr:false,
    css: ['~/assets/styles/main.scss'],
    runtimeConfig: {
        public: {
            apiUrl: process.env.AUTH_API_URL,
            appUrl: process.env.APP_URL,
            registerUrl: process.env.REGISTER_URL,
            cookieDomain: process.env.COOKIE_DOMAIN,
        }
    },
})
