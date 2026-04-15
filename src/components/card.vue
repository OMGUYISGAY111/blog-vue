<script setup>
import { ref, onMounted, onUnmounted } from 'vue';

// 1. 定义位置、速度和颜色
const x = ref(0);
const y = ref(0);
const vx = ref(2); // 横向速度
const vy = ref(2); // 纵向速度
const dvdColor = ref('rgb(245, 158, 11)'); // 初始颜色 (bg-amber-500)
const dvdElement = ref(null);

// 随机变换颜色
const changeColor = () => {
  const r = Math.floor(Math.random() * 256);
  const g = Math.floor(Math.random() * 256);
  const b = Math.floor(Math.random() * 256);
  dvdColor.value = `rgb(${r}, ${g}, ${b})`;
};

let animationId = null;

const animate = () => {
  if (!dvdElement.value) return;

  // 获取组件大小和窗口大小
  const rect = dvdElement.value.getBoundingClientRect();
  const screenWidth = window.innerWidth;
  const screenHeight = window.innerHeight;

  // 边界碰撞检测 (右侧/左侧)
  if (x.value + rect.width >= screenWidth || x.value <= 0) {
    vx.value = -vx.value;
    changeColor();
  }

  // 边界碰撞检测 (底部/顶部)
  if (y.value + rect.height >= screenHeight || y.value <= 0) {
    vy.value = -vy.value;
    changeColor();
  }

  // 更新坐标
  x.value += vx.value;
  y.value += vy.value;

  animationId = requestAnimationFrame(animate);
};

onMounted(() => {
  // 初始随机位置（防止卡在边缘）
  x.value = Math.random() * (window.innerWidth - 150);
  y.value = Math.random() * (window.innerHeight - 100);
  animate();
});

onUnmounted(() => {
  cancelAnimationFrame(animationId);
});
</script>

<template>
  <div 
    ref="dvdElement"
    class="fixed p-3 select-none cursor-pointer rounded shadow-lg transition-colors duration-200"
    :style="{ 
      transform: `translate(${x}px, ${y}px)`, 
      backgroundColor: dvdColor 
    }"
  >
    <p class="font-bold text-white">DVD</p>
    <p class="text-white opacity-80">Hello Vue!</p>
  </div>
</template>

<style scoped>
/* 确保容器不会被父级 overflow 限制 */
.fixed {
  position: fixed;
  top: 0;
  left: 0;
  will-change: transform; /* 性能优化 */
  z-index: 9999;
}
</style>