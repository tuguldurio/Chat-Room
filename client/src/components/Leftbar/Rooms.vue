<template>
  <div class="flex-grow flex-shrink flex flex-col px-8 py-2">
    <p class="text-gray-500 uppercase">Rooms</p>
    
    <div class="flex flex-col divide-y my-2 text-xl">
      <div @click="changeRoom" class="py-2 cursor-pointer"># Node.js</div>
      <div @click="changeRoom" class="py-2 cursor-pointer"># Python</div>
      <div @click="changeRoom" class="py-2 cursor-pointer"># MongoDB</div>
      <div @click="changeRoom" class="py-2 cursor-pointer"># MySQL</div>
      <div @click="changeRoom" class="py-2 cursor-pointer"># Socket.IO</div>
    </div>

  </div>
</template>

<script setup>
import { computed, defineEmits } from 'vue'
import { useStore } from 'vuex'

const store = useStore()
const room = computed(() => store.state.room)

const emit = defineEmits(['changeRoom'])

function changeRoom(event) {
  const room = event.target.text.slice(2)
  emit('changeRoom', room)
}
</script>

<style>

</style>