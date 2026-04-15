<template>
  <span class="inline-block">
    <span ref="typeTarget"></span>
  </span>
</template>

<script setup>
import { ref, onMounted, onUnmounted } from 'vue';
import Typed from 'typed.js';

// 1. 定义 Props，让父组件可以传入 strings
const props = defineProps({
  strings: {
    type: Array,
    required: true // 强制要求父组件必须传这个参数
  },
  typeSpeed: {
    type: Number,
    default: 100 // 默认值
  }
});

const typeTarget = ref(null);
let typed = null;

onMounted(() => {
  // 2. 将 props 传给 Typed 实例
  typed = new Typed(typeTarget.value, {
    strings: props.strings, // 使用 props 传进来的数据
    typeSpeed: props.typeSpeed,
    backSpeed: 50,
    backDelay: 1000,
    loop: true,
    showCursor: true,
  });
});

onUnmounted(() => {
  if (typed) typed.destroy();
});
</script>