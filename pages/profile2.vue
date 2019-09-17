<template>
  <section id="main" class="static">
    <div class="upper-banner">
      <div v-if='user'>
        Welcome to Splabbs {{ user.displayName }}
        {{ user.uid }}
      </div>
    </div>
  </section>
</template>

<script>
// import axios from 'axios'
import { mapActions, mapGetters } from 'vuex'
// import moment from 'moment'
// import _ from 'lodash'
// import upperBanner from '~/components/upperBanner.vue'
import firebase from '~/plugins/firebase.js'

export default {
  computed: {
    ...mapGetters(['user'])
  },
  created () {
    console.log('createdddd')
    firebase.auth().onAuthStateChanged((cuser) => {
      if (cuser) {
        this.setUser(cuser)
        // console.log('mounted')
      }
    })
  },
  methods: {
    ...mapActions(['setUser'])
  }
}
</script>
