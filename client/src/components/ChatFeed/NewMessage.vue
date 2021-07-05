<template>
  <form @submit.prevent="sendMessage" class="flex mx-4 my-3 bg-gray-100 rounded-xl">
    <div ref="inputEl" placeholder="Type a message..." contenteditable="true"
      class="editable flex-1 max-h-32 break-word overflow-y-auto cursor-text px-4 py-3 focus:outline-none"
      @input="updateMessage"
      @keydown.enter.exact.prevent
      @keydown.enter.exact="sendMessage"
      @keydown.enter.shift.exact="newline"
    >
    </div>

    <!-- Send button -->
    <div class="relative flex flex-col items-center justify-center w-10 h-full mx-2">
      <div class="inline-flex flex-col justify-end items-end w-full h-full my-2">
        <Airplane @click="sendMessage" class="w-8 h-8 rounded-full rotate-90 "
          :class="[message ? 'text-indigo-500  bg-red-500N cursor-pointer' : 'text-gray-300']"
        />
      </div>

    </div>
  </form>
</template>

<script setup>
import { ref, defineEmits, onMounted } from 'vue'

import { PaperAirplaneIcon as Airplane } from '@heroicons/vue/outline'

const emit = defineEmits(['sendMessage'])

const inputEl = ref(null)
onMounted(() => {
  inputEl.value.focus()
})

const message = ref('')

function updateMessage(event) {
  message.value = event.target.innerText
}

function sendMessage() {
  if (message.value != '') {
    emit('sendMessage', message.value)
    message.value = ''
    inputEl.value.innerText = ''
    inputEl.value.focus()
  }
}

function newLine() {
  message.value = `${message.value}\n`
}
</script>

<style scoped>
.editable:empty:before {
  content: attr(placeholder);
  @apply text-gray-400;
}
</style>