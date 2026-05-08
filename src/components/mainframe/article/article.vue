<template>
  <div class="article-container break-all">
    <!-- 只有当内容加载完成后才渲染，避免子组件解析空字符串 -->
    <MarkdownRender v-if="articleContent" :content="articleContent" />
    <div v-else class="text-center py-20 text-gray-400">正在加载文章...</div>
  </div>
</template>

<script setup lang="ts">
import { ref, watch } from 'vue';
import { useRoute } from 'vue-router';
import MarkdownRender from './comp/MarkdownRender.vue';

const route = useRoute();
const articleContent = ref('');

// 定义获取文章的函数
const fetchArticle = async (id: string) => {
  try {
    const baseUrl = import.meta.env.BASE_URL;
    // 直接从 public/docs/ 获取
    const timestamp = Date.now();
    const response = await fetch(`${baseUrl}docs/${id}.md?t=${timestamp}`);
    
    if (response.ok) {
      articleContent.value = await response.text();
    } else {
      articleContent.value = '# 404 \n 文章未找到';
    }
  } catch (e) {
    articleContent.value = '# Error \n 无法加载文章内容';
    console.error(e);
  }
};

// 监听路由参数 id 的变化 (比如从文章 A 跳转到文章 B)
watch(
  () => route.params.id,
  (newId) => {
    if (newId) {
      fetchArticle(newId as string);
    }
  },
  { immediate: true } // 立即执行一次，确保首屏进入时加载
);
</script>