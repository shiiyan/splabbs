<template>
  <section id="main" v-bind:class="{ ika: isIka }" class="stactic">
    <!-- データの入力 -->
    <div>
      <textarea
        v-bind:class="{ ika: isIka }"
        class="stactic"
        rows="1"
        cols="50"
        v-model="message"
        placeholder="Please enter a comment(within 100 characters)"
        maxlength="100"></textarea>
    </div>
    <div>
      <button v-bind:class="{ ika: isIka }" class="stactic" @click="sendData">
        Submit
      </button>
      <button v-bind:class="{ ika: isIka }" class="stactic" @click="switchIka">
        Switch
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
      message: '',
      isIka: true
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

<style>
@font-face {
    font-family: 'inklink';
    src: url('~assets/fonts/b882ed7.woff') format("woff");
}

.ika {
  font-family: 'inklink';
  font-size: 30px;
}

.stactic {
  font-size: 30px;
}

</style>
