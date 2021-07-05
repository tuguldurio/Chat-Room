<template>
  <div class="hidden sm:block max-w-[4rem] lg:max-w-[16rem] xl:max-w-sm w-full overflow-y-auto">
    <div class="lg:mt-6 px-2 lg:px-8 py-2">
      <p class="hidden lg:block text-gray-500 uppercase ">Active Users</p>

      <div class="flex flex-col space-y-2 my-4">
        <div v-for="(user, index) in users" :key="index"
          class="flex items-center space-x-2"
        >
          <img class="w-10 h-10 mx-auto lg:mx-0 rounded-full flex-shrink-0" :src="user.image" alt="">
          <p class="hidden lg:block">{{ user.username }}</p>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { computed } from 'vue'
import { useStore } from 'vuex'

const store = useStore()

const username = computed(() => store.state.username)
const users = computed(() => store.state.usersInRoom)
</script>