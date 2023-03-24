export default defineNuxtRouteMiddleware((to, from) => {
    const user = useUser().value;
    const config = useRuntimeConfig();
    const route = useRoute();

    const redirect = useState('redirect', () => route.query?.redirect).value

    if (user) {
        return navigateTo(redirect ? redirect : config.public.appUrl, {
            redirectCode: 302,
            external: true
        })
    }
})
