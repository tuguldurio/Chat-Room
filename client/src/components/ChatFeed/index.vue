<template>
  <div class="h-full flex-1 flex flex-col shadow z-0">
    <Header/>

    <div ref="messagesEl" class="flex-1 overflow-y-auto">
      <div v-for="(msgGroup, index) in groupedMessages" :key="index">
        
        <!-- Admin messages -->
        <div v-if="msgGroup.username=='admin'" class="flex flex-col space-y-4 p-8">
          <div v-for="(message, index) in msgGroup.messages" :key="index">
            {{ message.text }}
          </div>
        </div>

        <!-- User Messages -->
        <MessageGroup v-else :group="msgGroup"/>

      </div>
    </div>

    <NewMessage @sendMessage="$emit('sendMessage', $event)"/>
  </div>
</template>

<script setup>
import { ref, computed, watch, nextTick, defineEmits } from 'vue'
import { useStore } from 'vuex'

import Header from './Header.vue'
import MessageGroup from './MessageGroup.vue'
import NewMessage from './NewMessage.vue'

const emit = defineEmits(['sendMessage'])
const store = useStore()

const messages = computed(() => store.state.messages)

// group messages that are sent by same user in short gap
const groupedMessages = computed(() => {
  const arr = []
  let bigIndex = 0

  function pushToNewArray(username, image, text, time) {
    arr.push({ username, image, messages:[{ text, time }] })
  }

  for (let i = 0; i < messages.value.length; i++) {
    const { username, image, text, time } = messages.value[i]
    
    // first message is in it's group 
    if (i==0) {
      pushToNewArray(username, image, text, time)
    }
    // add to grouped messages if message is from sameuser withing 1 minutes
    else if (messages.value[i-1].username == username &&
      time.diff(arr[bigIndex].messages[0].time, 'minutes') <= 1) {
      arr[bigIndex].messages.push({ text, time })
    }
    // if doesn't belong to grouped message (different users message)
    else {
      pushToNewArray(username, image, text, time)
      bigIndex++
    }
  }
  return arr
})

// scroll to new message
const messagesEl = ref()
watch(store.state.messages, () => {
  nextTick(() => {
    messagesEl.value.lastElementChild.scrollIntoView({ block: 'end' })
  })
})
</script>