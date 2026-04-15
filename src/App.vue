<script setup lang="ts">
import { RouterView } from 'vue-router';
import Navbar from './components/navbar.vue';
import Backtop from './components/backtop.vue';
</script>

<template>
  <div>
    <main>
      <RouterView></RouterView>
      <Backtop></Backtop>
    </main>
  </div>
  <div>
  </div>
  <!-- <homepage /> -->
</template>
