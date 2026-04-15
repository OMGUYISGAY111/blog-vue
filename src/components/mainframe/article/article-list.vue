<template>
  <div class="max-w-4xl mx-auto py-12 px-6">
    <h1 class="text-4xl font-bold mb-10 text-gray-800">博客文章列表</h1>
    
    <div class="space-y-6">
      <router-link 
        v-for="post in paginatedPosts" 
        :key="post.id"
        :to="`/article/${post.id}`"
        class="block p-6 bg-black border border-gray-100 rounded-xl shadow-sm hover:shadow-md transition-all duration-300 border-l-4 border-l-blue-500"
      >
        <h2 class="text-2xl font-bold text-gray-900 mb-2">{{ post.title }}</h2>
        <div class="flex items-center text-sm text-gray-500 gap-4">
          <span class="font-mono">📅 {{ post.date }}</span>
          <span class="px-2 py-0.5 bg-gray-100 rounded text-xs text-gray-600">{{ post.tag }}</span>
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
import { ref, computed, onMounted } from 'vue';

interface Post {
  id: string;
  title: string;
  date: string;
  tag: string;
}

const posts = ref<Post[]>([]);
const currentPage = ref(1);
const pageSize = 5;

// 分页计算
const totalPages = computed(() => Math.ceil(posts.value.length / pageSize));
const paginatedPosts = computed(() => {
  const start = (currentPage.value - 1) * pageSize;
  return posts.value.slice(start, start + pageSize);
});

onMounted(() => {
  const modules = import.meta.glob('../../../docs/*.md', { query: '?raw', import: 'default', eager: true });
  
  posts.value = Object.entries(modules).map(([path, content]) => {
    const id = path.split('/').pop()?.replace('.md', '') || '';
    const text = content as string;
    
    // 正则增加对 \r 的兼容
    const titleMatch = text.match(/title:\s*(.*)/);
    const dateMatch = text.match(/date:\s*(.*)/);
    const tagMatch = text.match(/tags:\s*\[(.*)\]/);
    
    return {
      id,
      title: titleMatch ? titleMatch[1].replace('\r', '').trim() : '无标题',
      date: dateMatch ? dateMatch[1].replace('\r', '').trim() : '未知日期',
      tag: tagMatch ? tagMatch[1].split(',')[0].trim() : '未分类'
    };
  }).sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
});
</script>