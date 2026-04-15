<template>
  <div class="max-w-4xl mx-auto py-12 px-6">
    <h1 class="text-4xl font-bold mb-10 text-gray-800">博客文章列表</h1>
    
    <div class="space-y-6">
      <router-link 
        v-for="post in posts" 
        :key="post.id"
        :to="`/article/${post.id}`"
        class="block p-6 bg-black border border-gray-100 rounded-xl shadow-sm hover:shadow-md transition-all duration-300 border-l-4 border-l-blue-500"
      >
        <h2 class="text-2xl font-semibold text-gray-900 mb-2">{{ post.title }}</h2>
        <div class="flex items-center text-sm text-gray-500 gap-4">
          <span class="font-mono">📅 {{ post.date }}</span>
          <span class="px-2 py-0.5 bg-gray-100 rounded text-xs text-gray-600">{{ post.tag }}</span>
        </div>
      </router-link>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue';

interface Post {
  id: string;
  title: string;
  date: string;
  tag: string;
}

const posts = ref<Post[]>([]);

// 自动加载所有 docs 下的 md 文件
const modules = import.meta.glob('../../../docs/*.md', { query: '?raw', import: 'default', eager: true });

onMounted(() => {
  // 解析每一篇文章的内容
  posts.value = Object.entries(modules).map(([path, content]) => {
    const id = path.split('/').pop()?.replace('.md', '') || '';
    const text = content as string;
    
    // 简单的正则提取 meta
    const titleMatch = text.match(/title: (.*)/);
    const dateMatch = text.match(/date: (.*)/);
    const tagMatch = text.match(/tags: \[(.*)\]/);
    
    return {
      id,
      title: titleMatch ? titleMatch[1].trim() : '无标题',
      date: dateMatch ? dateMatch[1].trim() : '未知日期',
      tag: tagMatch ? tagMatch[1].split(',')[0].trim() : '未分类'
    };
  }).sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()); // 按时间倒序排序
});
</script>