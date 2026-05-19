<template>
  <div class="max-w-4xl mx-auto py-12 px-6">
    <h1 class="text-4xl font-bold mb-10 text-gray-800">文章列表</h1>
    
    <!-- 文章列表区 -->
    <div class="space-y-6">
      <router-link 
        v-for="post in paginatedPosts" 
        :key="post.id"
        :to="`/article/post/${post.id}`"
        class="block p-6 bg-black border border-gray-100 rounded-xl shadow-sm hover:shadow-md transition-all duration-300 border-l-4 border-l-blue-500"
      >
        <h2 class="text-2xl font-bold text-gray-900 mb-2">{{ post.title }}</h2>
        <div class="flex items-center text-sm text-gray-500">
          <span class="font-mono">最后更新: {{ post.date }}</span>
        </div>
      </router-link>
    </div>

    <!-- 💡 改造后的：一排按钮式分页控制区 -->
    <div class="flex gap-2 mt-10 justify-center items-center">
      <!-- 上一页 -->
      <button 
        :disabled="currentPage === 1"
        @click="changePage(currentPage - 1)"
        class="px-3 py-2 bg-gray-100 hover:bg-gray-200 text-gray-700 rounded-lg disabled:opacity-40 disabled:hover:bg-gray-100 transition-colors duration-200"
      >
        &lt;
      </button>

      <!-- 第一页的前置省略号 -->
      <span v-if="pageRange[0] > 1" class="px-2 text-gray-400">...</span>
      
      <!-- 动态数字页码按钮 -->
      <button 
        v-for="page in pageRange" 
        :key="page"
        @click="changePage(page)"
        :class="[
          'px-4 py-2 rounded-lg font-medium transition-all duration-200',
          currentPage === page 
            ? 'bg-blue-500 text-white shadow-sm' 
            : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
        ]"
      >
        {{ page }}
      </button>

      <!-- 最后一页的后置省略号 -->
      <span v-if="pageRange[pageRange.length - 1] < totalPages" class="px-2 text-gray-400">...</span>
      
      <!-- 下一页 -->
      <button 
        :disabled="currentPage >= totalPages"
        @click="changePage(currentPage + 1)"
        class="px-3 py-2 bg-gray-100 hover:bg-gray-200 text-gray-700 rounded-lg disabled:opacity-40 disabled:hover:bg-gray-100 transition-colors duration-200"
      >
        &gt;
      </button>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import blogList from '@/assets/blogList.json';

interface Post {
  id: string;
  title: string;
  date: string;
}

const route = useRoute();
const router = useRouter();

const posts = ref<Post[]>(blogList);
const pageSize = 5;

// 1. 获取当前页
const currentPage = computed(() => {
  const pagenumRaw = route.params.pagenum;
  const pageStr = Array.isArray(pagenumRaw) ? pagenumRaw[0] : (pagenumRaw ?? '1');
  const pageNum = Number.parseInt(pageStr, 10);
  return Number.isNaN(pageNum) || pageNum < 1 ? 1 : pageNum;
});

// 2. 总页数
const totalPages = computed(() => Math.ceil(posts.value.length / pageSize));

// 3. 💡 核心新增：计算当前需要展现出来的数字按钮范围
const pageRange = computed(() => {
  const total = totalPages.value;
  const current = currentPage.value;
  const visibleButtons = 5; // 你希望一行最多连续显示几个数字按钮
  
  let start = current - Math.floor(visibleButtons / 2);
  let end = current + Math.floor(visibleButtons / 2);

  // 靠前边界保护
  if (start < 1) {
    start = 1;
    end = Math.min(total, visibleButtons);
  }

  // 靠后边界保护
  if (end > total) {
    end = total;
    start = Math.max(1, total - visibleButtons + 1);
  }

  // 组装成数组，例如 [2, 3, 4, 5, 6]
  const pages = [];
  for (let i = start; i <= end; i++) {
    pages.push(i);
  }
  return pages;
});

// 4. 当前页数据切片
const paginatedPosts = computed(() => {
  const start = (currentPage.value - 1) * pageSize;
  return posts.value.slice(start, start + pageSize);
});

// 5. 路由路由跳转
const changePage = (page: number) => {
  if (page === 1) {
    router.push('/article');
  } else {
    router.push(`/article/page/${page}`);
  }
};
</script>