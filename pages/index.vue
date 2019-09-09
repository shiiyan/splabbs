<template>
  <section id="main">
    <!-- データの入力 -->
    <div>
      <textarea rows="4" cols="80" v-model="message" placeholder="Please enter a comment(within 100 characters)" maxlength="100"></textarea>
      <button id="button--green" @click="sendData">
        Submit
      </button>
    </div>
    <ul>
      <!-- リスト形式データの表示 -->
      <li v-for="post in orderedPosts" :key="post.id">
        {{ post.datetime }} Mr.nameless:
        {{ post.message }}
      </li>
    </ul>
  </section>
</template>

<script>
// import axios from 'axios'
import { mapGetters } from 'vuex'
import moment from 'moment'
import _ from 'lodash'
import firebase from '~/plugins/firebase.js'

const db = firebase.firestore()

export default {
  data () {
    return {
      message: ''
    }
  },
  computed: {
    // VuexからPostsデータを取得
    ...mapGetters(['posts']),
    orderedPosts () {
      return _.orderBy(this.posts, 'datetime', 'desc')
    }
  },
  created () {
    // firestoreのpostsをバインド
    this.$store.dispatch('setPostsRef', db.collection('posts'))
  },
  methods: {
    sendData () {
      // データのチェック
      if (this.message === '' || this.message.length > 100) {
        return false
      }
      const dbdata = {
        message: this.message,
        datetime: moment(new Date()).format('YYYY/MM/DD HH:mm:ss')
      }
      // データの登録
      db.collection('posts').add(dbdata)
    }
  }
}
</script>

<style>
main {
  font-family: 'inklink';
  src: '~/dist/font/b882ed7.woff';
}
</style>
