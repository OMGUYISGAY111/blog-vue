<script setup>
const props = defineProps({
  name: {
    type: String,
    required: true
  },
  detail: {
    type: String,
    required: true
  }
})
</script>

<template>
  <a href="#" class="card-container">
    <!-- 左侧头像 -->
    <img src="../assets/profileHead.png" class="profile-img">

    <div class="text-content">
      <!-- 1. 初始显示的文字：被无形遮罩控制 -->
      <div >
        <h1 id="title">{{ props.name }}</h1>
        <p class="detail">{{ props.detail }}</p>
      </div>

      
    </div>
    <!-- 2. Hover 后出现的文字：反向遮罩显现 -->
      <div class="hover-message">
        Enter
      </div>
  </a>
</template>

<style scoped>
/* 容器基础样式 */
.card-container {
  display: flex;
  align-items: center;
  position: relative;
  width: 100%;
  height: auto;
  background-color: black;
  border-radius: 1.5rem;
  padding: 1.25rem;
  overflow: hidden;
  text-decoration: none;
  container-type: inline-size;
  transition: background-color 0.3s;
}

/* 组合图形 ::before：方块 + 圆 */
.card-container::before {
  content: "";
  position: absolute;
  z-index: 3;
  width: 70%; 
  height: 10ch;
  
  /* 左方右圆拼接 */
  background: 
    linear-gradient(aqua, aqua) no-repeat left / 80% 10ch,
    radial-gradient(circle, aqua 69%, transparent 70%) no-repeat right / 10ch 10ch;

  top: 50%;
  left: -70%; /* 初始藏在左边 */
  transform: translateY(-50%);
  transition: left 0.5s cubic-bezier(0.4, 0, 0.2, 1);
}

.card-container:hover::before {
  left: 0;
}

/* 文字包装层 */
.text-content {
  position: relative;
  z-index: 2; /* 确保文字在 aqua 图形之上 */
  padding-left: 0.5rem;
  flex: 1;
}

/* 初始文字：被“抹除”动画 */
.base-text {
  transition: clip-path 0.5s ease;
  /* 初始状态：完全可见 */
  clip-path: inset(0 0 0 0); 
}

.card-container:hover .base-text {
  /* Hover 状态：左边缘推到 100%，字就被“抹掉”了 */
  clip-path: inset(0 0 0 100%);
}
/* --- 最左侧显现的新文字 --- */
.hover-message {
  position: absolute;
  top: 50%;
  left: 15%; /* 这里的 left 控制它在容器最左边的间距 */
  transform: translateY(-50%);
  
  z-index: 10; /* 确保在最顶层 */
  color: black;
  font-weight: 900;
  font-size: 2.5rem;
  white-space: nowrap;
  pointer-events: none;

  /* 初始遮罩：完全隐藏 */
  clip-path: inset(0 100% 0 0);
  transition: clip-path 0.25s cubic-bezier(0.4, 0, 0.2, 1);

  line-height: 1.2;
  transition-delay: 0s;
}

.card-container:hover .hover-message {
  /* Hover 时从左往右“刷”出来 */
  clip-path: inset(0 0 0 0);
  transition-delay: 0.1s;
}
/* 其他辅助样式 */
.profile-img {
  height: 50cqw;
  object-contain: contain;
  border-radius: 1.5rem;
  padding: 0.75rem;
}

#title {
  color: white;
  margin-bottom: 5px;
  line-height: 1em;
  font-size: 15cqw;
  text-align: left;
}

.detail {
  color: #ccc;
  text-align: left;
}

.card-container:hover {
  background-color: aquamarine; /* 这里的背景色可以微调或删掉 */
}
</style>