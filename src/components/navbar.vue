<script setup>
import { Heart, Menu, Moon, Search } from 'lucide-vue-next';
import { ref } from 'vue';
import { RouterLink } from 'vue-router';

// 组件逻辑
const MobileMenuDisplay = ref(false);
const searchKeyword = ref('');

const handleSearch = () => {
  if (searchKeyword.value.trim()) {
    console.log("search:",searchKeyword.value)
    MobileMenuDisplay.value = false;
    searchKeyword.value = '';
  }
}
</script>

<template>
  <nav class="bg-white shadow-lg fixed w-full z-50 left-0"> 
    <div class="max-w-7xl mx-auto px-4">
      <div class="flex justify-between h-16 items-center">

        <!--logo-->
        <div class="text-2xl font-bold text-gray-500">
          <RouterLink to="/">my website</RouterLink>
        </div>

        <div class=" grow"></div>

        <!--nav-->
        <div class="hidden md:flex space-x-16">
          <RouterLink to="/" class="text-gray-500 hover:text-blue-400">home</RouterLink>
          <RouterLink to="/about" class="text-gray-500 hover:text-blue-400">about</RouterLink>
          <RouterLink to="/article" class=" text-gray-500 hover:text-blue-300">文章</RouterLink>
          <RouterLink to="/test" class=" text-amber-300 hover:text-amber-700">test</RouterLink>
        </div>

        <!--功能-->
        <div class=" flex space-x-4 items-center">

          <!--search-->
          <!-- <div class=" hidden sm:block">
            <div class=" relative">
              <input
              type="text"
              placeholder="搜索..."
              v-model="searchKeyword"
              @keyup.enter="handleSearch"
              class=" focus:ring-blue-300 focus:outline-none focus:ring-2 w-48 px-4 py-2 rounded-lg bg-gray-50 border border-gray-300"
              >
              <button @click="handleSearch" class=" absolute right-3 top-2.5">
                <Search></Search>
              </button>
            </div>
          </div> -->

          <!-- <button class=" p-2 bg-gray-200 rounded-2xl"><Moon/></button>
          <button @click="MobileMenuDisplay = !MobileMenuDisplay" class="md:hidden p-2 bg-gray-200 rounded-2xl"><Menu></Menu></button> -->
        </div>
      </div>
    </div>

  <!--移动端menu-->
  <div v-show="MobileMenuDisplay" class=" md:hidden bg-white border-t">
    <div class=" px-4 py-3 space-y-2">
          <a href="/" class="block py-2 text-gray-500 hover:text-blue-400">home</a>
          <a href="/about" class="block py-2 text-gray-500 hover:text-blue-400">about</a>
          <a href="/article" class="block py-2 text-gray-500 hover:text-blue-300">文章</a>
    </div>
  </div>
  </nav>
</template>

<style scoped>

</style>