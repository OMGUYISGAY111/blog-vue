<template>
  <div class="article-container break-all">
    <MarkdownRender :content="articleContent" />
  </div>
</template>

<script setup lang="ts">
import { ref, watchEffect } from 'vue';
import { useRoute } from 'vue-router';
import MarkdownRender from './comp/MarkdownRender.vue';

const route = useRoute();
const articleContent = ref('');

// 批量导入所有 md 文件 (根据你的实际路径调整)
const modules = import.meta.glob('../../../docs/*.md', { query: '?raw', import: 'default' });

watchEffect(async () => {
  const id = route.params.id as string;
  // 根据 URL 的 id 找到对应的文件
  const loader = modules[`../../../docs/${id}.md`];
  
  if (loader) {
    articleContent.value = await loader() as string;
  } else {
    articleContent.value = '# 文章未找到';
  }
});
</script>