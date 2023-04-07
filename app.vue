<template>
   <div class="container">
     <div class="row" style="height:100vh; justify-content: center; align-items: center;">
       <div class="col col-lg-5">
        <Logo class="text-center pb-4"/>
         <form @submit.prevent="onSubmit">
           <div class="card" style="border:none;">
             <div class="card-body">
              <div id="liveAlertPlaceholder"></div>
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
                 Dont have an account? <a :href="config.public.registerUrl" style="color:#F5A623;">Create Account</a>
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

.btn-primary {
background-color: #f8b500;
border-radius: 4px;
color: #FFFFFF;
font-weight: bold;
padding: 15px 40px;
border: none;
}


</style>