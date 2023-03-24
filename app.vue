<template>
  <div class="container">
     <div class="row" style="height:100vh; justify-content: center; align-items: center;">
        <div class="col">
           <div id="liveAlertPlaceholder"></div>
           <form @submit.prevent="onSubmit">
              <h1 class="h3 mb-3 fw-normal">
                 Iniciar Sesión
              </h1>
              <div class="mb-3">
                 <label class="form-label" for="email">Correo Electrónico</label>
                 <input v-model="data.form.email"
                    type="email" 
                    class="form-control" 
                    id="email" 
                    placeholder="name@example.com">
              </div>
              <div class="mb-3">
                 <label class="form-label" for="password">Contraseña</label>
                 <input v-model="data.form.password" 
                    type="password" 
                    class="form-control" 
                    id="password" 
                    placeholder="Password">
              </div>
              <button type="submit" class="btn btn-primary" :disabled="data.loading">Submit</button>
           </form>
        </div>
     </div>
  </div>
</template>

<script setup>
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
.main_image {
  height: 100%;
  background-size: cover;
  background-position: center; 
}
</style>