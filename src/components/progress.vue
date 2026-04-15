<script setup lang="ts">
import { ref } from 'vue';
import Section from './section.vue';
import Navbar from './navbar.vue';

interface Section {
  id: string;
  title: string;
  content: string;
}

// function isPartiallyVisible(el:HTMLElement):boolean {
//   const rect:DOMRect = el.getBoundingClientRect();
//   return rect.top < window.innerHeight && rect.bottom >= 0;
// }

// 基础随机字符函数
function randomText(length: number): string {
    const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789 ';
    return Array.from({ length }, () => chars[Math.floor(Math.random() * chars.length)]).join('');
}

// 生成 10 个章节
const sections = ref<Section[]>(Array.from({ length: 10 }, (_, i) => ({
    id: `section-${i}`, // 唯一的 ID，用于后续锚点跳转
    title: `Chapter ${i + 1}: ${randomText(10)}`, // 随机标题
    content: randomText(800) // 随机正文
})));
</script>

<template>


<div class="flex">
    <aside class="fixed left-0 top-10 w-48 h-screen bg-gray-100 p-4 overflow-y-auto">
      <h2 class="font-bold mb-4">目录</h2>
      <ul>
        <li v-for="section in sections" :key="section.id" class="mb-2">
          <a :href="`#${section.id}`" class="text-blue-500 hover:underline text-sm">
            {{ section.title }}
          </a>
        </li>
      </ul>
    </aside>

    <main class="ml-48 p-10  bg-fuchsia-950 min-h-screen">
      <!-- <div v-for="section in sections" :key="section.id" :id="section.id" class="mb-12">
        <h2 class="text-3xl font-black mb-4 border-b-2 border-black pb-2">
          {{ section.title }}
        </h2>
        <p class="break-all leading-relaxed text-lg text-blue-300">
          {{ section.content }}
        </p>
      </div> -->
      <Section 
        v-for="section in sections" 
        :key="section.id" 
        :id="section.id"
        :title="section.title" 
        :content="section.content" 
      />
    </main>
  </div>
</template>

<style scoped src="../homepage.css">

</style>