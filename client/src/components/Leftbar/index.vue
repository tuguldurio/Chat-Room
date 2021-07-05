<template>
  <div
    class="absolute sm:static flex flex-col max-w-[16rem] xl:max-w-sm w-full h-full bg-white z-10 sm:z-0 transform sm:transform-none transition-all ease-in-out  sm:transition-none"
    :class="[mobileMenuOpen ? '-translate-x-0 shadow' : '-translate-x-full']"
  >
    <XIcon class="absolute w-6 h-6 top-4 right-4 sm:hidden"
      @click="closeMobileMenu"
    />

    <div class="h-24 flex items-center justify-center">
      <p class="text-3xl font-medium">ChatRoom</p>
    </div>

    <Rooms @changeRoom="changeRoom"/>

    <!-- Logout -->
    <div @click="emit('logout')" class="flex items-center px-8 py-5 cursor-pointer">
      <svg xmlns="http://www.w3.org/2000/svg" class="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
      </svg>
      <p class="ml-2 py-1 uppercase select-none">Leave Chatroom</p>
    </div>
  </div>
</template>

<script setup>
import { computed, defineEmits } from 'vue'
import { useStore } from 'vuex'

import Rooms from './Rooms.vue'
import { XIcon } from '@heroicons/vue/solid'

const store = useStore()
const emit = defineEmits(['changeRoom', 'logout'])

function changeRoom(event) {
  emit('changeRoom', event)
  closeMobileMenu()
}

const mobileMenuOpen = computed(() => store.state.mobileMenuOpen)
function closeMobileMenu() {
  store.dispatch('closeMobileMenu')
}
</script>