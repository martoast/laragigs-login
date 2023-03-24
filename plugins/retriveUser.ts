import { User } from "~~/utils/User"

export default defineNuxtPlugin(async (nuxtApp) => {
    nuxtApp.hook('logout:clearToken', async () => {
        const config = useRuntimeConfig();

        const expired_token = useCookie('auth.access_token', {
            domain: config.public.cookieDomain
        })
        
        expired_token.value = null

        await navigateTo('/')
    })

    const retriveUser = async () => {
        const access_token = useCookie('auth.access_token');
        const config  = useRuntimeConfig();
        if (access_token.value) {
            try {
                const response = await $fetch('/auth/user');
                const user: User = response.data
                useState('user', () => user)
                const redirect = useState('redirect').value

                return navigateTo(redirect ? redirect : config.public.appUrl, {
                    redirectCode: 302,
                    external: true
                })
            } catch(error) {
                nuxtApp.callHook('logout:clearToken')
            }
        }
    }

    await retriveUser();
    
    return {
        provide: {
            retriveUser: retriveUser
        }
    }
})
