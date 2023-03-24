<template>
   <div class="container">
     <div class="row" style="height:100vh; justify-content: center; align-items: center;">
       <div class="col col-lg-6">
         <div id="liveAlertPlaceholder"></div>
         <form @submit.prevent="onSubmit">
           <div class="card">
             <div class="card-body">
               <h1 class="card-title text-center mb-4">Sign in</h1>
               <div class="form-floating mb-3">
                 <input v-model="data.form.email" type="email" class="form-control" id="email" placeholder="name@example.com">
                 <label for="email">Email</label>
               </div>
               <div class="form-floating mb-3">
                 <input v-model="data.form.password" type="password" class="form-control" id="password" placeholder="Password">
                 <label for="password">Password</label>
               </div>
               <button type="submit" class="btn btn-lg btn-primary w-100 mt-3" :disabled="data.loading">Submit</button>
               <div class="text-center mt-4">
                 Dont have an account? <a :href="config.public.registerUrl" class="link-primary">Create Account</a>
               </div>
             </div>
           </div>
         </form>
       </div>
     </div>
   </div>
 </template>

<script setup>
const config = useRuntimeConfig();
const data = reactive({
    loading: false,
    errors: {},
    form: {
        email: null,
        password: null
    }
});

const onSubmit = async () => {
    data.loading = true

    const alertPlaceholder = document.getElementById('liveAlertPlaceholder')

    const alert = (message, type) => {
      const wrapper = document.createElement('div')
      wrapper.innerHTML = [
        `<div class="alert alert-${type} alert-dismissible" role="alert">`,
        `   <div>${message}</div>`,
        '   <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>',
        '</div>'
      ].join('')

      alertPlaceholder.append(wrapper)
    }

    try {
        const response = await $fetch('/auth/login', {
            method: 'post',
            body: data.form
        })
    
        const { $loginUser, $retriveUser } = useNuxtApp()
        await $loginUser(response);
    } catch (error) {
        data.errors = error.response._data
        alert(data.errors.message, 'danger')
        data.loading = false
    }
}
</script>


<style scoped>
/* .login-container .card {
  border: none;
  border-radius: 1rem;
  box-shadow: 0 0.5rem 1rem rgba(0, 0, 0, 0.15);
} */

.login-container .card-title {
  font-weight: 600;
  font-size: 2rem;
}

.login-container .form-floating {
  position: relative;
}

.login-container .form-floating input {
  padding: 0.375rem 2.25rem 0.375rem 0.75rem;
  height: auto;
}

.login-container .form-floating label {
  position: absolute;
  top: 0;
  left: 0;
  pointer-events: none;
  padding: 0.375rem 0.75rem;
  font-size: 1rem;
  opacity: 0.5;
  transition: transform 0.2s ease-out, opacity 0.2s ease-out;
  transform-origin: top left;
  transform: translate3d(0, 0.5rem, 0);
}

.login-container .form-floating input:focus + label,
.login-container .form-floating input:not(:placeholder-shown) + label {
  transform: translate3d(0, -1.25rem, 0) scale(0.8);
  opacity: 1;
}

.login-container .btn-primary {
  background-color: #546E7A;
  border-color: #546E7A;
}

.login-container .btn-primary:hover {
  background-color: #455a64;
  border-color: #455a64;
}

.login-container .link-primary {
  color: #546E7A;
  text-decoration: none;
}

.login-container .link-primary:hover {
  text-decoration: underline;
}


</style>