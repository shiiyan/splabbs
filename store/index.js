import { vuexfireMutations, firestoreAction } from 'vuexfire'

// export const strict = false
export const STORAGE_KEY = 'currentUser'

export const state = () => ({
  posts: [],
  user: process.browser ? JSON.parse(window.localStorage.getItem(STORAGE_KEY) || null) : null
})

export const mutations = {
  ...vuexfireMutations,
  setUser (state, payload) {
    state.user = JSON.parse(JSON.stringify(payload))
  }
  // setFromLS (state) {
  //   if (process.browser) {
  //     state.user = JSON.parse(window.localStorage.getItem(STORAGE_KEY))
  //   }
  // }
}

export const actions = {
  setPostsRef: firestoreAction(function (context, ref) {
    context.bindFirestoreRef('posts', ref)
  }),
  setUser ({ commit }, payload) {
    commit('setUser', payload)
  }
  // setFromLS ({ commit }) {
  //   commit('setFromLS')
  // }
}

export const getters = {
  posts: state => state.posts,
  user: state => state.user
}

const setLocalUser = (store) => {
  console.log('aaa')
  if (process.browser) {
    store.subscribe((mutation, state) => {
      window.localStorage.setItem(STORAGE_KEY, JSON.stringify(state.user))
    })
  }
}

export const plugins = [ setLocalUser ]
