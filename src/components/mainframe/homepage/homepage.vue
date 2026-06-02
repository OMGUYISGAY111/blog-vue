<script setup>
import { ref } from 'vue';
import PersonCard from '../../personCard.vue';
import HomeNav from './comp/homeNav.vue';
import { hellowocao } from '@/backend/api/helloApi.ts';

// 组件逻辑

const localListener = ref('');

const findtheSignal = async (result) => {
  try {
    result.value = await hellowocao();
  } catch (err) {
    result.value = "you fucked";
  }
}

findtheSignal(localListener);

</script>

<template>
  <div class=" flex min-h-[80vh] justify-center">

    <div class=" items-center justify-center flex flex-col w-fit">

      <div class="justify-center flex flex-col w-fit">
        <img class=" object-contain h-35" src="../../../assets/profileHead.png">
        <h1>404 Not Found</h1>
        <p>a ghost live in a web</p>
      </div>

      <p>{{ localListener }}</p>

      <!-- <HomeNav></HomeNav> -->
      <!-- <PersonCard :name="'Null Website'" :detail="'hello world'"></PersonCard> -->

    </div>

  </div>
</template>

<style scoped>

</style>