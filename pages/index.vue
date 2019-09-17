<template>
  <section id="main" v-bind:class="{ ika: isIka }" class="static">
    <upper-banner
      :isIka="isIka"
      v-bind:class="{ ika: isIka }">
    </upper-banner>
    <!-- データの入力 -->
    <div>
      <textarea
        v-bind:class="{ ika: isIka }"
        class="static"
        rows="1"
        cols="50"
        v-model="message"
        placeholder="Please enter a comment(within 100 characters)"
        maxlength="100"></textarea>
    </div>
    <div>
      <button v-bind:class="{ ika: isIka }" class="static" @click="sendData">
        Submit
      </button>
      <button v-bind:class="{ ika: isIka }" class="static" @click="switchIka">
        Switch
      </button>
    </div>
    <ul>
      <!-- リスト形式データの表示 -->
      <li v-for="post in orderedPosts" :key="post.id">
        {{ post.datetime }} {{ post.owner }}:
        {{ post.message }}
      </li>
    </ul>
  </section>
</template>

<script>
// import axios from 'axios'
import { mapGetters, mapActions } from 'vuex'
import moment from 'moment'
import _ from 'lodash'
import upperBanner from '~/components/upperBanner.vue'
import firebase from '~/plugins/firebase.js'

const db = firebase.firestore()

export default {
  data () {
    return {
      message: '',
      isIka: true
    }
  },
  components: {
    upperBanner
  },
  computed: {
    // VuexからPostsデータを取得
    ...mapGetters(['posts', 'user']),
    orderedPosts () {
      return _.orderBy(this.posts, 'datetime', 'desc')
    }
  },
  created () {
    // firestoreのpostsをバインド
    this.$store.dispatch('setPostsRef', db.collection('posts'))
    // this.setFromLS()
    // console.log('created')
    firebase.auth().onAuthStateChanged((user) => {
      if (user) {
        this.setUser(user)
        // console.log('mounted')
      }
    })
  },
  methods: {
    ...mapActions(['setUser']),
    sendData () {
      // データのチェック
      if (this.message === '' || this.message.length > 100) {
        return false
      }
      const dbdata = {
        message: this.message,
        datetime: moment(new Date()).format('YYYY/MM/DD HH:mm:ss'),
        owner: this.user ? this.user.displayName : 'Mr.nameless'
      }
      // データの登録
      db.collection('posts').add(dbdata)
    },
    switchIka () {
      if (this.isIka) {
        this.isIka = false
      } else {
        this.isIka = true
      }
    }
  }
}
</script>

<style lang="scss">
@font-face {
    font-family: 'inklink';
    src: url('~assets/fonts/b882ed7.woff') format("woff");
}

.ika {
  font-family: 'inklink';
  font-size: 30px;
}

.static {
  font-size: 30px;
}
</style>
