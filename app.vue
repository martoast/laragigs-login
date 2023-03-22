<template>
  <div class="container">
    <div class="row" style="height:100vh; justify-content: center; align-items: center;">
      <div class="col-md-5">
        <form @submit.prevent="onSubmit">
          <div class="mb-3">
            <label for="exampleInputEmail1" class="form-label">Email address</label>
            <input v-model="form.email" type="email" class="form-control" id="exampleInputEmail1" aria-describedby="emailHelp">
            <div id="emailHelp" class="form-text">We'll never share your email with anyone else.</div>
          </div>
          <div class="mb-3">
            <label for="exampleInputPassword1" class="form-label">Password</label>
            <input v-model="form.password" type="password" class="form-control" id="exampleInputPassword1">
          </div>
          <div class="mb-3 form-check">
            <input type="checkbox" class="form-check-input" id="exampleCheck1">
            <label class="form-check-label" for="exampleCheck1">Check me out</label>
          </div>
          <button type="submit" class="btn btn-primary">Submit</button>
        </form>

      </div>
      <div class="col-md-7">
        <img src="/images/laragigs.jpeg" class="img-fluid">


      </div>

    </div>
  </div>
</template>

<script setup>
const route = useRoute()
const config = useRuntimeConfig();

const redirect_url = null

if (route.params.redirect) {
  redirect_url = route.params.redirect
}

const form = ref({
  email: null,
  password: null
})


const onSubmit = async () => {
  try {
    const { data } = await useFetch(() => config.public.apiUrl + "/auth/login", {
    method: "post",
    body: form
  })
    const access_token = useCookie('auth.access_token')
    access_token.value = data.value.access_token

    if (redirect_url) {
      await navigateTo(redirect_url, {
        external: true
      })
    }
    else {
      await navigateTo(config.public.appUrl, {
        external: true
      })
    }
  }
   catch (e) {
    console.error(e)
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