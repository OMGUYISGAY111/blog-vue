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

<style>
.article-container {
  h1:not(.meta-info) {
    margin-top: 3rem;
  }

  h2:not(.meta-info) {
    margin-top: 1rem;
  }

  h3:not(.meta-info) {
    color: white;
    margin-top: 0.5rem;
  }

  a {
    color: rgb(166, 150, 197);
    transition: 0.3s cubic-bezier(0.075, 0.82, 0.165, 1);
  }

  a:hover {
    color: blueviolet;
    font-size: 1.1em;
  }

  a::before {
    
  content: '';
  display: inline-block;
  width: 1em;
  height: 1em;
  --svg: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24'%3E%3Cpath fill='none' stroke='black' stroke-dasharray='28' stroke-linecap='round' stroke-linejoin='round' stroke-width='2' d='M13 6l2 -2c1 -1 3 -1 4 0l1 1c1 1 1 3 0 4l-5 5c-1 1 -3 1 -4 0M11 18l-2 2c-1 1 -3 1 -4 0l-1 -1c-1 -1 -1 -3 0 -4l5 -5c1 -1 3 -1 4 0'%3E%3Canimate fill='freeze' attributeName='stroke-dashoffset' dur='0.6s' values='28;0'/%3E%3C/path%3E%3C/svg%3E");
  background-color: currentColor;
  -webkit-mask-image: var(--svg);
  mask-image: var(--svg);
  -webkit-mask-repeat: no-repeat;
  mask-repeat: no-repeat;
  -webkit-mask-size: 100% 100%;
  mask-size: 100% 100%;

  }
}
</style>