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
import { mapActions, mapState, mapGetters } from 'vuex'
import firebase from '~/plugins/firebase'

export default {
  props: ['isIka'],
  computed: {
    ...mapState(['user']),
    ...mapGetters(['user'])
  },
  created () {
    console.log('created')
    firebase.auth().onAuthStateChanged((cuser) => {
      if (cuser) {
        this.setUser(cuser)
      }
    })
  },
  methods: {
    ...mapActions(['setUser']),
    logout () {
      firebase.auth().signOut()
        .then(() => { this.setUser(null) })
        .catch((e) => { alert(e) })
        .then(() => { this.$router.push('/login') })
        .catch((e) => { alert(e) })
      // if (process.browser) {
      //   window.localStorage.setItem('currentUser', null)
      // }
    },
    toprofile () {
      this.$router.push('/profile')
    }
  }
}
</script>
