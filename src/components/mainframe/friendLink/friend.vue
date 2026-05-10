<script setup>
import friendList from '@/../public/data/friendLink.json'
import PersonCard from '@/components/personCard.vue';
// 组件逻辑
</script>

<template>
  <div>
    <h1>我的朋友们</h1>
    <div class="grid gap-7 lg:grid-cols-2 md:grid-cols-2 mx-[5vw] mt-[5vh] mb-[15vh]">
        <div class=" flex justify-center">
            <PersonCard 
            name="wrdf"
            detail="wtf">dfsdf</PersonCard>
        </div>
        <PersonCard 
        name="wrdf"
        detail="wtf">dfsdf</PersonCard>
        <PersonCard 
        name="wrdf"
        detail="wtf">dfsdf</PersonCard>
        <PersonCard 
        name="wrdf"
        detail="wtf">dfsdf</PersonCard>
        <PersonCard 
        name="wrdf"
        detail="wtf">dfsdf</PersonCard>
        <PersonCard 
        name="wrdf"
        detail="wtf">dfsdf</PersonCard>
        <PersonCard 
        name="wrdf"
        detail="wtf">dfsdf</PersonCard>
    </div>
  </div>
</template>

<style scoped>

</style>