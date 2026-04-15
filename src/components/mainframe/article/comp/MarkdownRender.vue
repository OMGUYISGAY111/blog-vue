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
import { computed, reactive } from 'vue';
import MarkdownIt from 'markdown-it';

const props = defineProps<{ content: string }>();
const md = new MarkdownIt({ html: true, linkify: true });

const meta = reactive<Record<string, string>>({
  title: '',
  date: ''
});

const renderedHtml = computed(() => {
  if (!props.content) return '';

  // 修改：增加 \s* 匹配可能的空行，并且用 .*? 匹配任意字符
  // 使用 /s 标志（dotAll）让 . 可以匹配换行符
  const metaRegex = /^---\s*?\n([\s\S]*?)\n---\s*?\n([\s\S]*)$/m;
  const match = props.content.match(metaRegex);

  let markdownContent = props.content;

  if (match) {
    const metaString = match[1]; // 拿到 --- 里面的内容
    markdownContent = match[2];  // 拿到剩余的 Markdown 正文

    // 解析 metaString（简单的键值对切割）
    const lines = metaString.split('\n');
    lines.forEach(line => {
      const [key, ...values] = line.split(':');
      if (key && values.length > 0) {
        meta[key.trim()] = values.join(':').trim();
      }
    });
  }

  return md.render(markdownContent);
});
</script>