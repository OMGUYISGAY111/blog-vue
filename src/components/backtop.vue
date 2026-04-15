<script setup lang="ts">
import { ArrowBigUp } from 'lucide-vue-next';
import { onMounted, onUnmounted, ref } from 'vue';
import type { Ref } from 'vue';

// 组件逻辑
    const isVisible:Ref<boolean> = ref(false);

    const handleScroll = () => {
        isVisible.value = window.scrollY > 200;
    }

    const scrollToTop = () => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        })
    }

    onMounted(() => {
        window.addEventListener('scroll', handleScroll);
    });

    onUnmounted(() => {
        window.removeEventListener('scroll', handleScroll);
    })
</script>

<template>
  <div>
    <Transition
    enter-active-class="transition duration-300 ease-out"
    enter-from-class="opacity-0 translate-y-10"
    enter-to-class="opacity-100 translate-y-0"
    leave-active-class="transition duration-300 ease-in"
    leave-from-class="opacity-100 translate-y-0"
    leave-to-class="opacity-0 translate-y-10"
    >
        <button @click="scrollToTop" v-if="isVisible"  class=" fixed bottom-5 right-6 rounded-full bg-amber-100 p-2 shadow-2xl "><ArrowBigUp></ArrowBigUp></button>
    </Transition>
  </div>
</template>

<style scoped src="../tailwind.css">

</style>