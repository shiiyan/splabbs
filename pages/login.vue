<template>
  <div class="login-page">
    <welcome-banner></welcome-banner>
    <login-form></login-form>
  </div>
</template>
<script>
import loginForm from '~/components/loginForm.vue'
import welcomeBanner from '~/components/welcomeBanner.vue'

export default {
  components: {
    loginForm,
    welcomeBanner
  }
}
</script>
