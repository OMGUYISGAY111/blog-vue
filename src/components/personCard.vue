<script setup>
// 组件逻辑

  function wtf2() {
    alert("keep caonima");
  }

  const wtf = () => {
    alert("wocaonima");
  }

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
  <a href="https://css-tricks.com/a-complete-guide-to-css-media-queries/"  class=" flex h-auto bg-black rounded-3xl p-5 w-full card-container" >
    <img src="../assets/profileHead.png" class=" h-[50cqw] text-left object-contain rounded-3xl p-3">
    <div class=" pl-1.5">
      <h1 class=" min-w-0" id="title">{{ props.name }}</h1>
      <p class=" text-left">{{ props.detail }}</p>
    </div>
  </a>
</template>

<style scoped>
    a {
      position: relative;
      overflow:hidden;
    }

    a::before {
  content: "";
  position: absolute;
  width: 50%; 
  height: 10ch;

  /* 核心修正：这里要写两个背景，用逗号隔开 */
  background: 
    /* 1. 画左边的方块 (10ch 宽) */
    /* 2. 在透明画布上绘画 */
    /* 左侧：画一个 10ch 宽的实心方块 */
    linear-gradient(aqua, aqua) no-repeat left / 100% 10ch;
    /* 右侧：画一个 10ch 宽的圆，圆以外是 transparent（透明） */
    /* radial-gradient(circle, aqua 69%, transparent 70%) no-repeat right / 10ch 10ch; */

  top: 50%;
  left: -50%; 
  transform: translateY(-50%);
  transition: left 0.4s ease;
  
  /* 建议加上这个，防止意外的颜色填充 */
  background-color: transparent;
}

    a:hover::before {
      left: 50%;
      transform: translate(-100%, -50%); /* 整体移动到中心 */
    }

    .card-container {
        container-type: inline-size;
    }

    .card-container:hover {
      background-color: aquamarine;
    }

    #title {
        text-align: left;
        margin-bottom: 5px;
        margin-top: 2cqh;
        line-height: 1em;
        font-size: 15cqw;
    }
</style>


<!-- <template>
  <div class="flex bg-black rounded-3xl p-5 w-[500px] card-container">
    <img src="../assets/profileHead.png" class="h-48 w-48 border-2 border-red-500 object-cover rounded-3xl p-3">
    <div class="pl-1.5 text-white">
      <h1 id="title">{{ props.name }}</h1>
      <p>{{ props.detail }}</p>
    </div>
  </div>
</template> -->

<!-- <style scoped>
.card-container {
  /* 关键：必须设置这个才能触发 @container 逻辑 */
  container-type: inline-size;
  /* 确保卡片不会被内容撑破 */
  display: flex;
  overflow: hidden; 
  /* 建议添加一个最小宽度，防止在极小空间下显示异常 */
  min-width: 200px;
}

#title {
  /* 这里的 5cqw 会随卡片宽度实时变大变小 */
  font-size: clamp(1.2rem, 5cqw, 2.5rem);
  white-space: nowrap; /* 标题不折行 */
  overflow: hidden;
  text-overflow: ellipsis; /* 如果实在太窄，显示省略号 */
}

/* 进阶：当卡片宽度小于 300px 时，强制隐藏文字，只留图片或简化布局 */
@container card-container (max-width: 300px) {
  .details-box {
    display: none; /* 极小空间下隐藏详情 */
  }
}
</style> -->