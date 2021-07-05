import { createStore } from 'vuex'
import moment from 'moment'

const store = createStore({
  state: {
    joined: false,
    username: '',
    room: null,
    messages: [],
    usersInRoom: [],
    mobileMenuOpen: false
  },
  getters: {},
  mutations: {
    SET_JOINED(state, joined) {
      state.joined = joined
    },
    SET_USERNAME(state, username) {
      state.username = username
    },
    SET_ROOM(state, room) {
      state.room = room
    },
    ADD_MESSAGE(state, message) {
      const { username, image, text, time } = message
      state.messages.push({ username, image, text, time: moment(time) })
    },
    SET_USERS(state, users) {
      state.usersInRoom = users
    },
    CLEAR_MESSAGES(state) {
      state.messages = []
    },
    SET_MOBILE_MENU(state, bool) {
      state.mobileMenuOpen = bool
    }
  },
  actions: {
    setUsername({ commit }, username) {
      commit('SET_USERNAME', username)
      if (username === '')
        commit('SET_JOINED', false)
      else
        commit('SET_JOINED', true)
    },
    setRoom({ commit }, room) {
      commit('SET_ROOM', room)
    },
    addMessage({ commit }, message) {
      commit('ADD_MESSAGE', message)
    },
    setUsersInRoom({ commit }, users) {
      commit('SET_USERS', users)
    },
    clearMessages({ commit }) {
      commit('CLEAR_MESSAGES')
    },
    openMobileMenu({ commit }) {
      commit('SET_MOBILE_MENU', true)
    },
    closeMobileMenu({ commit }) {
      commit('SET_MOBILE_MENU', false)
    }
  }
})

export default store