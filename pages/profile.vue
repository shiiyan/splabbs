<template>
  <section>
    <upper-banner
        :isIka="isIka"
        v-bind:class="{ ika: isIka }">
      </upper-banner>
    <div class="profile">
      <h2>profile of {{ user.displayName }} </h2>
      <ul>
        <li>createdAt: {{ user.createdAt }}</li>
        <li>email:  {{ user.email }}</li>
        <li>lastLoginAt:  {{ user.lastLoginAt }}</li>
        <li>uid:  {{ user.uid }}</li>
        <li>chatHistory: </li>
      </ul>
    </div>
  </section>
</template>
<script>
import { mapActions, mapGetters } from 'vuex'
import upperBanner from '~/components/upperBanner.vue'
// import firebase from '~/plugins/firebase'

export default {
  computed: {
    ...mapGetters(['user'])
  },
  components: {
    upperBanner
  },
  methods: {
    ...mapActions(['setUser'])
  }
}
</script>
