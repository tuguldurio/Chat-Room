<template>
  <div :class="{'sm:hidden': props.onLeftBar}">
  <p class="sm:hidden lg:block text-gray-500 uppercase ">Active Users</p>

  <div class="flex sm:flex-col sm:space-y-2 my-4"
    :class="{'flex-wrap': props.onLeftBar}"
  >
    <div v-for="(user, index) in users" :key="index"
      class="flex items-center space-x-2 "
      :class="{'mx-1 my-1': props.onLeftBar}"
    >
      <img :src="user.image" alt=""
        class="w-10 h-10 mx-auto lg:mx-0 rounded-full flex-shrink-0"
        :class="{'border-2 border-indigo-500': username == user.username}"
      >
      <p class="hidden lg:block">{{ user.username }}</p>
    </div>
  </div>
  </div>
</template>

<script setup>
import { computed, defineProps } from 'vue'
import { useStore } from 'vuex'

const store = useStore()

const username = computed(() => store.state.username)
const users = computed(() => store.state.usersInRoom)

const props = defineProps({
  onLeftBar: {
    type: Boolean,
    default: false
  }
})
</script>