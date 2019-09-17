<template>
  <section>
    <upper-banner></upper-banner>
    <div v-if="user" class="profile">
      <h2>profile of {{ user.displayName }} </h2>
      <ul>
        <li>createdAt: {{ user.createdAt }}</li>
        <li>email:  {{ user.email }}</li>
        <li>lastLoginAt:  {{ user.lastLoginAt }}</li>
        <li>uid:  {{ user.uid }}</li>
        <li>chatHistory:
          <ul>
            <li v-for="post in filteredPosts" :key="post.id">
              {{ post.datetime }} {{ post.owner }}:
              {{ post.message }}
            </li>
          </ul>
        </li>
      </ul>
    </div>
  </section>
</template>
<script>
import { mapActions, mapGetters } from 'vuex'
import upperBanner from '~/components/upperBanner.vue'
import firebase from '~/plugins/firebase.js'

const db = firebase.firestore()

export default {
  computed: {
    ...mapGetters(['posts', 'user']),
    filteredPosts () {
      return this.posts.filter(post => post.owner === this.user.displayName)
    }
  },
  components: {
    upperBanner
  },
  methods: {
    ...mapActions(['setUser'])
  },
  created () {
    this.$store.dispatch('setPostsRef', db.collection('posts'))
    console.log('created_profile')
    firebase.auth().onAuthStateChanged((cuser) => {
      if (cuser) {
        this.setUser(cuser)
        // console.log('mounted')
      }
    })
  }
}
</script>
