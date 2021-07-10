<template>
  <div class="hidden sm:block max-w-[4rem] lg:max-w-[16rem] xl:max-w-sm w-full overflow-y-auto">
    <div class="lg:mt-6 px-2 lg:px-8 py-2">
      <ActiveUsers/>      
    </div>
  </div>
</template>

<script setup>
import ActiveUsers from '@/components/Rightbar/ActiveUsers.vue'
</script>