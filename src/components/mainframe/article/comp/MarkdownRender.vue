<script setup lang="ts">
import { ref, onMounted, computed } from 'vue';
import { useRoute } from 'vue-router';
import MarkdownIt from 'markdown-it';
// 1. 引入你生成的 JSON
import blogList from '@/assets/blogList.json';

const route = useRoute();
const rawContent = ref('');
const md = new MarkdownIt({ html: true, linkify: true, breaks: true });

// 2. 根据路由 ID 找到对应的文章元数据
const postMeta = computed(() => {
  return blogList.find(item => item.id === route.params.id) || { title: '未知标题', date: '未知日期' };
});

onMounted(async () => {
  try {
    const baseUrl = import.meta.env.BASE_URL;
    const response = await fetch(`${baseUrl}docs/${route.params.id}.md`);
    
    if (response.ok) {
      const text = await response.text();
      // 3. 去掉正则解析 meta 的部分，直接过滤掉 MD 顶部的 --- 区域（如果还有的话）
      rawContent.value = text;
    }
  } catch (e) {
    console.error("加载失败", e);
  }
});

// 4. 只负责渲染正文 HTML
const renderedHtml = computed(() => {
  return md.render(rawContent.value);
});
</script>

<template>
  <div class="prose max-w-none text-left">
    <header class="mb-8 border-l-4 border-blue-500 pl-6">
      <!-- 5. 直接使用从 JSON 里找出来的标题和日期 -->
      <h1 class="text-4xl font-extrabold tracking-tight text-gray-900 meta-info">
        {{ postMeta.title }}
      </h1>
      <div class="inline-flex items-center px-3 py-1 bg-gray-100 rounded-full text-xs font-medium text-gray-600">
        📅 {{ postMeta.date }}
      </div>
    </header>

    <hr class="my-8" />

    <div v-html="renderedHtml"></div>
  </div>
</template>