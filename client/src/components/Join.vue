<template>
  <div class="absolute w-screen h-screen-real px-8">
    <form @submit.prevent="submit"
      class="max-w-md w-full relative center"
    >
      <div v-if="loading" class="absolute w-full h-full z-10 bg-white bg-opacity-90N flex items-center justify-center">
        <div class="w-12 h-12 border-4 border-blue-600 rounded-full loader animate-spin"></div>
      </div>

      <p class="absolute w-full text-indigo-900 font-el -top-20 text-5xl sm:text-6xl text-center">ChatRoom</p>

      <input ref="usernameEl" v-model="username" type="text" placeholder="Username"
        class="w-full appearance-none border rounded mb-2 py-2 px-3 text-grey-darker focus:outline-none"
        :class="[props.error ? 'focus:ring ring-red-400 border-red-300' : 'focus:ring ring-indigo-400', !loading ? 'shadow' : '']"
        :disabled="loading"
      >
      
      <p v-if="props.error" class="text-red-500">
        {{ props.error }}
      </p>

      <button
        class="w-full mt-2 px-6 py-2 font-medium leading-6 text-center text-white uppercase transition bg-indigo-700 hover:bg-indigo-800 rounded hover:shadow-lg focus:outline-none"
        :class="{'shadow': !loading}"
        :disabled="loading"
      >
        Join
      </button>
    </form>
  </div>
</template>

<script setup>
import { ref, defineProps, defineEmits, onMounted } from 'vue'

const props = defineProps({
  error: String
})
const emit = defineEmits(['submit'])

const loading = ref(false)

const username = ref('')
function submit() {
  if (username.value != '') {
    loading.value = true
    emit('submit', username.value)
  }
}

const usernameEl = ref(null)
onMounted(() => {
  if (username.value)
    usernameEl.value.focus()
})
</script>

<style scoped lang="postcss">
.center {
  @apply top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2;
}
.loader {
  border-right-color: transparent;
}
</style>