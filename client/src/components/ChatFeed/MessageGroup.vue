<template>
  <div class="flex flex-col p-3 rounded-lg" 
    :class="[myMessage ? 'col-start-6 col-end-13' : 'col-start-1 col-end-8']"
  >
    <div class="text-center text-xs">{{ ago }}</div>

    <div v-if="!myMessage" class="w-auto text-xs ml-14 mb-2 text-gray-500 font-medium">
      {{ group.username }}
    </div>

    <div class="flex items-end"
      :class="[myMessage ? 'justify-start flex-row-reverse' : 'flex-row']"
    >

      <img class="w-10 h-10 rounded-full flex-shrink-0" :src="group.image" alt="">
      
      <div class="max-w-[65%] md:max-w-lg lg:max-w-md xl:max-w-sm 2xl:max-w-xl flex flex-col space-y-2">
        <Bubble v-for="(message, index) in group.messages" :key="index" 
          :myMessage="myMessage"
          :text="message.text"
        />
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, defineProps, onUnmounted } from 'vue'
import { useStore } from 'vuex'

import Bubble from './MessageGroupBubble.vue'

const props = defineProps({
  group: Object
})
const store = useStore()
const username = computed(() => store.state.username)
const myMessage = computed(() => props.group.username == username.value)

// repr of times ago
const ago = ref(props.group.messages[0].time.fromNow())
const interval = setInterval(() => {
  ago.value = props.group.messages[0].time.fromNow()
}, 1000)

onUnmounted(() => clearInterval(interval))
</script>