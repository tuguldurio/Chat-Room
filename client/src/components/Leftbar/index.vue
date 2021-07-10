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

    <div class="flex-grow flex-shrink">
      <Rooms @changeRoom="changeRoom"/>
      <ActiveUsers class="px-8" :onLeftBar="true"/>
    </div>


    <!-- Logout -->
    <div @click="emit('logout')" class="flex items-center px-8 py-5 cursor-pointer">
      <LogoutIcon class="w-6 h-6"/>
      <p class="ml-2 py-1 uppercase select-none">Leave Chatroom</p>
    </div>
  </div>
</template>

<script setup>
import { computed, defineEmits } from 'vue'
import { useStore } from 'vuex'

import Rooms from './Rooms.vue'
import { LogoutIcon } from '@heroicons/vue/outline'
import { XIcon } from '@heroicons/vue/solid'

import ActiveUsers from '@/components/Rightbar/ActiveUsers.vue'

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