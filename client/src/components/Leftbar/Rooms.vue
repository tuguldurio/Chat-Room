<template>
  <div class="flex flex-col px-8 py-2">
    <p class="text-gray-500 uppercase">Rooms</p>
    
    <div class="flex flex-col divide-y my-2 text-xl">
      <div v-for="(room, index) in rooms" :key="index" @click="changeRoom(index)"
        class="py-2 cursor-pointer px-2 transition-colors"
        :class="{'bg-indigo-500 text-white': rooms[activeIndex] == room}"
      >
        # {{ room }}
      </div>
    </div>

  </div>
</template>

<script setup>
import { ref, computed, defineEmits } from 'vue'
import { useStore } from 'vuex'

const store = useStore()
const room = computed(() => store.state.room)

const emit = defineEmits(['changeRoom'])

const rooms = [
  'Node.js',
  'Python',
  'MongoDB',
  'MySQL',
  'Socket.IO'
]

const activeIndex = ref(0)

function changeRoom(index) {
  activeIndex.value = index
  emit('changeRoom', rooms[index])
}
</script>