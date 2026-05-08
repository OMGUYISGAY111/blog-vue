<template>
  <div class="prose max-w-none text-left">
    <header class="mb-8 border-l-4 border-blue-500 pl-6">
      <h1 class="text-4xl font-extrabold tracking-tight text-gray-900">{{ meta.title }}</h1>
      <div class="inline-flex items-center px-3 py-1 bg-gray-100 rounded-full text-xs font-medium text-gray-600">
  {{ meta.date }}
</div>
    </header>

    <hr class="my-8" />

    <div v-html="renderedHtml"></div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted, computed, reactive } from 'vue';
import { useRoute } from 'vue-router';
import MarkdownIt from 'markdown-it';

const route = useRoute();
const rawContent = ref('');
const md = new MarkdownIt({ html: true, linkify: true, breaks: true });

const meta = reactive<Record<string, string>>({
  title: '',
  date: ''
});

onMounted(async () => {
  try {
    // 自动拼接 base 路径，例如变成 /blog-vue/docs/4.md
    const baseUrl = import.meta.env.BASE_URL; 
    const response = await fetch(`${baseUrl}docs/${route.params.id}.md`);
    
    if (response.ok) {
      rawContent.value = await response.text();
    } else {
      console.error("文件不存在");
    }
  } catch (e) {
    console.error("加载失败", e);
  }
});

const renderedHtml = computed(() => {
  if (!rawContent.value) return '';

  // 改进你的正则：兼容不同操作系统的换行符 \r\n
  const metaRegex = /^---\s*[\r\n]+([\s\S]*?)[\r\n]+---\s*[\r\n]+([\s\S]*)$/;
  const match = rawContent.value.match(metaRegex);

  if (match) {
    const metaString = match[1];
    const markdownContent = match[2];

    // 解析元数据
    metaString.split('\n').forEach(line => {
      const [key, ...val] = line.split(':');
      if (key && val.length > 0) meta[key.trim()] = val.join(':').trim();
    });

    return md.render(markdownContent);
  }
  
  return md.render(rawContent.value);
});
</script>