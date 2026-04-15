<script setup>
// 组件逻辑
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
  <div class=" flex h-auto bg-black rounded-3xl p-5 w-fit card-container" >
    <img src="../assets/profileHead.png" class=" h-48 text-left object-contain rounded-3xl p-3">
    <div class=" pl-1.5">
      <h1 class=" min-w-0" id="title">{{ props.name }}</h1>
      <p class=" text-left">{{ props.detail }}</p>
    </div>
  </div>
</template>

<style scoped>
    .card-container {
        container-type: initial;
    }

    #title {
        text-align: left;
        margin-bottom: 5px;
        line-height: 1em;
        font-size: clamp(1rem,4cqw,5cqw);
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