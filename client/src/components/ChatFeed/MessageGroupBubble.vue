<template>
  <div
    class="flex"
    :class="{'flex-row-reverse': myMessage}"
  >
    <div
      class="py-2 px-3 shadow rounded-xl"
      :class="myMessage ? 'mr-3 bg-indigo-500 text-white' : 'ml-3 bg-indigo-50/50'"
    >
      <p class="text-base break-word whitespace-pre-wrap">
        {{ text }}
      </p>
    </div>
    <!-- to fill up empty space -->
    <div></div>
  </div>
</template>

<script setup>
import { defineProps } from 'vue'

const props = defineProps({
  myMessage: Boolean,
  text: String
})
</script>