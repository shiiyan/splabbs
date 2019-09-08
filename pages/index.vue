<template>
    <section id="main">
        <!-- データの入力 -->
        <textarea v-model="message" placeholder="Please enter a comment(within 100 characters)" maxlength="100"></textarea>
        <div class="submitBtn" v-on:click="sendData">
            Submit
        </div>
        <ul>
            <!-- リスト形式データの表示 -->
            <li v-for="post in posts" v-bind:key="post.id">
                {{ post.message }}
            </li>
        </ul>
    </section>
</template>

<script>
import axios from 'axios';
import firebase from "~/plugins/firebase.js";
import { mapGetters } from 'vuex';

const db = firebase.firestore();

export default {
    data() {
        return {
            message: "",
        }
    },
    computed: {
        // VuexからPostsデータを取得
        ...mapGetters(['posts'])
    },
    created: function () {
        // firestoreのpostsをバインド
        this.$store.dispatch('setPostsRef', db.collection('posts'))
    },
    methods: {
        sendData: function () {
            // データのチェック
            if (this.message == "" || this.message.length > 100) {
                return false;
            }
            let dbdata = {
                message: this.message
            };
            // データの登録
            db.collection('posts').add(dbdata);
        }
    }
}
</script>
