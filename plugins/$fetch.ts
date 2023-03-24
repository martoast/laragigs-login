export default defineNuxtPlugin((nuxtApp) => {
    const globalHeaders = () => {
        const access_token = useCookie('auth.access_token');
        const runtimeConfig = useRuntimeConfig();
    
        const globalOptions = {
            baseURL: runtimeConfig.public.apiUrl,
            headers: {
                'Accept': 'application/json',
                'Authorization': access_token?.value 
            },
        };
        
        globalThis.$fetch = $fetch.create({...globalOptions});
    }

    nuxtApp.hook('fetch:globalHeaders', globalHeaders)

    globalHeaders();
})
