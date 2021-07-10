<template>
  <div v-if="userJoined" class="h-screen-real flex">
    <Leftbar @changeRoom="changeRoom" @logout="logout"/>
    <Chat @sendMessage="sendMessage"/>
    <Rightbar/>
  </div>
  <div v-else class="h-screen-real">
    <Join @submit="join" :error="joinError"/>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue'
import { useStore } from 'vuex'
import { io } from 'socket.io-client'

import Leftbar from '@/components/Leftbar/index.vue'
import Chat from '@/components/ChatFeed/index.vue'
import Join from '@/components/Join.vue'
import Rightbar from '@/components/Rightbar/index.vue'

const store = useStore()

const userJoined = computed(() => store.state.joined)

const url = process.env.NODE_ENV === 'development' ? 'localhost:8000' : 'https://tuguldurio-chat-room-node.herokuapp.com/'
const socket = io(url)

socket.on('message', (message) => {
  store.dispatch('addMessage', message)
})

socket.on('roomData', (users) => {
  store.dispatch('setUsersInRoom', users.users)
})

socket.on('disconnect', (reason) => {
  store.dispatch('setUsername', '')
  store.dispatch('clearMessages')
})

const joinError = ref(null)

function join(username) {
  socket.connect()
  const room = 'Node.js'

  socket.emit('joinRoom', { username, room }, (error) => {
    if (error) {
      joinError.value = error
      socket.disconnect()
    }
    else {
      store.dispatch('setUsername', username)
      store.dispatch('setRoom', room)
    }
  })
}

function changeRoom(room) {
  socket.emit('changeRoom', room, () => {
    store.dispatch('setRoom', room)
    store.dispatch('clearMessages')
  })
}

function sendMessage(message) {
  socket.emit('sendMessage', message)
}

function logout() {
  socket.disconnect()
}

// real height screen port for mobile views
function updateHeightVar() {
  const doc = document.documentElement
  doc.style.setProperty('--vh', (window.innerHeight) + 'px')
}

updateHeightVar()

window.addEventListener('resize', () => {
  updateHeightVar()
})
</script>

<style>
@import url('https://fonts.googleapis.com/css2?family=Poppins:ital,wght@0,100;0,200;0,300;0,400;0,500;0,800;1,100;1,200;1,300;1,400;1,500&display=swap');

#app {
  @apply font-poppins;
}

.h-screen-real {
  height: 100vh; /* Fallback for browsers that do not support Custom Properties */
  height: var(--vh);
}

.break-word {
  word-break: break-word;
}

/* custom scrollbar */
::-webkit-scrollbar {
  width: 6px;
}

::-webkit-scrollbar-track {
  background-color: transparent;
}

::-webkit-scrollbar-thumb {
  border-radius: 20px;
  border: 6px;
  background-clip: content-box;
  @apply bg-indigo-200;
}

::-webkit-scrollbar-thumb:hover {
  @apply bg-indigo-300;
}
</style>