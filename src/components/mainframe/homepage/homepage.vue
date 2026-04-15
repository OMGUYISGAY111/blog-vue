<script setup lang="ts">
import Backtop from './backtop.vue';
import Count from './count.vue';
import PersonCard from './personCard.vue';

// 组件逻辑
</script>

<template>

    <div></div>

  <div class="grid">
    <div class=" grid grid-cols-2 gap-2">
      <PersonCard></PersonCard>
      <PersonCard></PersonCard>
      <PersonCard></PersonCard>
      <PersonCard></PersonCard>
      <PersonCard></PersonCard>
    </div>


    <p class=" text-4xl bg-blue-400">hello world</p>
    <p class=" text-red-500">test</p>
    <!-- <Card></Card> -->
    <Count></Count>
    <Backtop></Backtop>
  </div>
</template>

<style scoped src="../homepage.css">

</style>