<template>
  <div class="max-w-4xl mx-auto py-12 px-6">
    <h1 class="text-4xl font-bold mb-10 text-gray-800">文章列表</h1>
    
    <div class="space-y-6">
      <router-link 
        v-for="post in paginatedPosts" 
        :key="post.id"
        :to="`/article/post/${post.id}`"
        class="block p-6 bg-black border border-gray-100 rounded-xl shadow-sm hover:shadow-md transition-all duration-300 border-l-4 border-l-blue-500"
      >
        <h2 class="text-2xl font-bold text-gray-900 mb-2">{{ post.title }}</h2>
        <div class="flex items-center text-sm text-gray-500">
          <span class="font-mono">最后更新: {{ post.date }}</span>
        </div>
      </router-link>
    </div>

    <div class="flex gap-4 mt-10 justify-center items-center">
      <button 
        :disabled="currentPage === 1"
        @click="currentPage--"
        class="px-4 py-2 bg-gray-200 rounded hover:bg-gray-300 disabled:opacity-50"
      >上一页</button>
      
      <span class="text-gray-600">第 {{ currentPage }} / {{ totalPages || 1 }} 页</span>
      
      <button 
        :disabled="currentPage >= totalPages"
        @click="currentPage++"
        class="px-4 py-2 bg-gray-200 rounded hover:bg-gray-300 disabled:opacity-50"
      >下一页</button>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue';
// 导入生成的极简 JSON
import blogList from '@/assets/blogList.json';

// 定义简单的类型接口
interface Post {
  id: string;
  title: string;
  date: string;
}

const posts = ref<Post[]>(blogList);
const currentPage = ref(1);
const pageSize = 5;

const totalPages = computed(() => Math.ceil(posts.value.length / pageSize));
const paginatedPosts = computed(() => {
  const start = (currentPage.value - 1) * pageSize;
  return posts.value.slice(start, start + pageSize);
});
</script>