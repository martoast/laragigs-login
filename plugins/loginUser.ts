import { JWTAuth } from "~~/utils/JWTAuth";

export default defineNuxtPlugin(async (nuxtApp) => {
    const loginUser = async (jwt: JWTAuth) => {
        const config  = useRuntimeConfig();
    
        const access_token = useCookie('auth.access_token', {
            domain: config.public.cookieDomain
        });

        access_token.value = jwt.token_type.charAt(0).toUpperCase() + jwt.token_type.slice(1) + ' ' + jwt.access_token;
        
        await nuxtApp.callHook('fetch:globalHeaders');

        const redirect = useState('redirect').value

        return navigateTo(redirect ? redirect : config.public.appUrl, {
            redirectCode: 302,
            external: true
        })
    }

    return {
        provide: {
            loginUser: loginUser
        }
    }
})