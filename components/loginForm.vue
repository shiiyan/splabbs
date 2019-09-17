<template>
  <div class="login-form">
    <div @click="gotologin" v-show="!tologin">Loginする</div>
    <div v-show="tologin">
      Email&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
      <input type="text" v-model="email"><br>
      パスワード
      <input type="password" v-model="password"><br>
      <button @click="login">ログイン</button>
    </div>
  </div>
</template>

<script>
import { mapActions, mapState } from 'vuex'
import firebase from '~/plugins/firebase.js'

export default {
  data () {
    return {
      tologin: false,
      email: '',
      password: ''
    }
  },
  methods: {
    gotologin () {
      this.tologin = true
    },
    ...mapActions(['setUser']),
    login () {
      firebase.auth().signInWithEmailAndPassword(this.email, this.password)
        // .then((user) => {
        //   const userTemp = firebase.auth().currentUser
        //   userTemp.updateProfile({ displayName: 'testUser2' })
        // })
        .then((user) => { this.$router.push('/') })
        .catch((e) => { alert(e) })
    }
  },
  computed: {
    ...mapState(['user'])
  },
  mounted () {
    firebase.auth().onAuthStateChanged((user) => {
      if (user) {
        this.setUser(user)
      }
    })
  }
}
</script>
