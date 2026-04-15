<template>
  <div class="card-wrapper">
    <div class="card">
      <img src="example.jpg" class="card-image" />
      <div class="card-content">
        <h3>卡片标题</h3>
        <p>这是随父容器大小变化的描述内容。</p>
      </div>
    </div>
  </div>
</template>

<style scoped>
/* 1. 定义容器 */
.card-wrapper {
  container-type: inline-size; /* 核心：让父级成为查询容器 */
  container-name: card-container;
}

/* 2. 组件样式 */
.card {
  display: flex;
  flex-direction: column; /* 默认垂直布局 */
  gap: 1rem;
  padding: 1rem;
  border: 1px solid #ccc;
}

/* 3. 使用容器查询：当卡片宽度超过 500px 时，变为横向布局 */
@container card-container (min-width: 500px) {
  .card {
    flex-direction: row;
  }
  
  .card-image {
    width: 200px;
  }
}
</style>