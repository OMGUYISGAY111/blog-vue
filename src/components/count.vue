<script setup>
import { ref } from 'vue';

// 组件逻辑
    let count = ref(0)

    function countplus() {
        count.value++;
    }
</script>

<template>
  <div>
    <p>{{ count }}</p>
    <button @click="countplus" class=" bg-amber-300 shadow-2xl text-blue-600">click me</button>
  </div>
</template>

<style scoped>

</style>