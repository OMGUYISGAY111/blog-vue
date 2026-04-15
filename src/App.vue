<script setup lang="ts">
import { RouterView } from 'vue-router';
import Navbar from './components/navbar.vue';
import Backtop from './components/backtop.vue';
</script>

<template>
  <Navbar />
  <div class=" relative top-16">
    <main>
      <RouterView></RouterView>
      <Backtop></Backtop>
    </main>
  </div>
  <div>
  </div>
  <!-- <homepage /> -->
</template>
