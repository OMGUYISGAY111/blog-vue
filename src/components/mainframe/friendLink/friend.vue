<script setup>
import friendList from '@/../public/data/friendLink/friendLink.json'
import PersonCard from '@/components/personCard.vue';
// 组件逻辑
</script>

<template>
  <div>
    <h1>我的朋友们</h1>
    <div class="grid gap-7 lg:grid-cols-2 md:grid-cols-2 mx-[5vw] mt-[5vh] mb-[15vh]">
        <PersonCard v-for="friend in friendList" 
        :name="friend.name" 
        :detail="friend.detail"
        :link="friend.link"
        :pic="friend.pic"></PersonCard>
    </div>
  </div>
</template>

<style scoped>

</style>