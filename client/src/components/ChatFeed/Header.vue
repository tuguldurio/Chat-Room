<template>
  <div class="h-16 sm:h-24 relative flex items-center justify-center shadow">
    <MenuIcon class="absolute w-6 h-6 left-6 sm:hidden"
      @click="open"
    />
    <p class="text-2xl font-light">
      {{ room }}
      <span class="text-indigo-500">({{ count }})</span>
    </p>
  </div>
</template>

<script setup>
import { computed } from 'vue'
import { useStore } from 'vuex'

import { MenuIcon } from '@heroicons/vue/solid'

const store = useStore()
const room = computed(() => store.state.room)
const count = computed(() => store.state.usersInRoom.length)

function open() {
  store.dispatch('openMobileMenu')
}
</script>