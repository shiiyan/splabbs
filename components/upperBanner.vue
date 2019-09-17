<template>
  <div class="upper-banner">
    <div v-if='user'>
      Welcome to Splabbs {{ user.displayName }}
      <button v-show="user" v-bind:class="{ ika: isIka }" @click="logout">Logout</button>
      <button v-show="user" v-bind:class="{ ika: isIka }" @click="toprofile">Profile</button><br>
    </div>
  </div>
</template>
<script>
import { mapActions, mapState } from 'vuex'
import firebase from '~/plugins/firebase'

export default {
  props: ['isIka'],
  computed: {
    ...mapState(['user'])
  },
  methods: {
    ...mapActions(['setUser']),
    logout () {
      firebase.auth().signOut()
        .then(() => { this.setUser(null) })
        .catch((e) => { alert(e) })
        .then(() => { this.$router.push('/login') })
        .catch((e) => { alert(e) })
    },
    toprofile () {
      this.$router.push('/profile')
    }
  }
}
</script>
