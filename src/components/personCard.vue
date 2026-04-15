<script setup>
// 组件逻辑
</script>

<template>
  <div class=" flex h-auto bg-black rounded-3xl p-5 w-fit card-container" >
    <img src="../assets/profileHead.png" class=" h-48 text-left object-contain rounded-3xl p-3">
    <div class=" pl-1.5">
      <h1 class=" min-w-0" id="title">Null Website</h1>
      <p class=" text-left">the ghost wowowo<br>wowow<br>test123<br>2354<br>456<br>789</p>
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