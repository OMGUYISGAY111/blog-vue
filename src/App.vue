<script setup lang="ts">
import { RouterView, useRoute } from 'vue-router';
import Navbar from './components/general/navbar.vue';
import Backtop from './components/backtop.vue';
import { computed, watch } from 'vue';
import friendBG from '@/assets/pic/bg/bg1.jpg'

const route = useRoute();
const wtf = computed(() => route.path)
console.log(wtf.value);

watch(() => route.path, (path) => {
  if (path === '/friend') {
    // 关键：直接操作 DOM 根节点，注入变量
    document.documentElement.style.setProperty('--global-bg', `url(${friendBG})`);
  } else {
    // 离开页面时清除，防止影响其他页面
    document.documentElement.style.removeProperty('--global-bg');
  }
}, { immediate: true });

</script>

<template>
  <div :class=wtf :style="{'--image-bg': `url(${friendBG})`}">
    <Navbar></Navbar>
    <main class=" pt-16">
      <RouterView></RouterView>
      <Backtop></Backtop>
    </main>
  </div>
  <div>
  </div>
  <!-- <homepage /> -->
</template>

<style>
  #app:has([class="/friend"]) {

    background-image: var(--image-bg);
    /* border: 1px solid #333; */
}

.\/friend {
  min-height: fit-content;
  position: relative;
}

.\/friend::before {
  content: "";
  width: 100%;
  height: 100%;
  position: absolute;
  top:0%;
  left:0%;
  background-color: rgba(0, 0, 0, 0.6);
  z-index: -1;
  backdrop-filter: blur(10px);
  filter: blur(10px);
  -webkit-backdrop-filter: blur(10px);
  pointer-events: none;

  /* 核心：使用 mask-image 控制模糊区域 */
  /* 我们创建一个从左到右、再从上到下的渐变组合 */
  mask-image: linear-gradient(to bottom,black 0%, black 20%,black 93%,transparent 100%);
              
  
  /* 确保两个渐变叠加生效 */
  mask-composite: intersect;
}

:root {
  background-image: var(--global-bg);
  background-attachment: fixed;
  background-size: cover;
  z-index: -2;
}

</style>

<style scoped>
</style>