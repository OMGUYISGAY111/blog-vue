<template>
  <div 
    ref="root" 
    :id="id"
    class="mb-12 transition-opacity duration-700 ease-out"
    :class="isVisible ? 'opacity-100' : 'opacity-0'"
  >
    <h2 class="text-3xl font-black mb-4 border-b-2 border-black pb-2">
      {{ title }}
    </h2>
    <p class="break-all leading-relaxed text-lg text-blue-300">
      {{ content }}
    </p>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted, onUnmounted } from 'vue';

defineProps<{ title: string; content: string; id: string }>();

const root = ref<HTMLElement | null>(null);
const isVisible = ref(false);
let observer: IntersectionObserver;

onMounted(() => {
  observer = new IntersectionObserver((entries) => {
    // 一旦发现进入视口，就设为 true
    if (entries[0].isIntersecting) {
      isVisible.value = true;
      // 可选：如果只需要触发一次动画，观察到后可以停止观察
      // observer.unobserve(root.value!);
    } else {
        //isVisible.value = false;
    }
  }, { threshold: 0.1 });

  if (root.value) observer.observe(root.value);
});

onUnmounted(() => {
  if (observer) observer.disconnect();
});
</script>