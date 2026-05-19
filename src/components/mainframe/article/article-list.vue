<template>
  <div class="max-w-4xl mx-auto py-12 px-6">
    <h1 class="text-4xl font-bold mb-10 text-gray-800">文章列表</h1>
    
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

    <!-- 分页控制区 -->
    <div class="flex gap-4 mt-10 justify-center items-center">
      <button 
        :disabled="currentPage === 1"
        @click="changePage(currentPage - 1)"
        class="px-4 py-2 bg-gray-200 rounded hover:bg-gray-300 disabled:opacity-50"
      >上一页</button>
      
      <span class="text-gray-600">第 {{ currentPage }} / {{ totalPages || 1 }} 页</span>
      
      <button 
        :disabled="currentPage >= totalPages"
        @click="changePage(currentPage + 1)"
        class="px-4 py-2 bg-gray-200 rounded hover:bg-gray-300 disabled:opacity-50"
      >下一页</button>
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

// 1. 💡 关键修改：把 currentPage 改为计算属性
// 它会根据当前浏览器地址栏的 :pagenum 自动计算自己是第几页
const currentPage = computed(() => {
  const pagenumRaw = route.params.pagenum;
  // 安全解析：支持数组或字符串，如果不存在（比如访问的是 /article）就默认为第 1 页
  const pageStr = Array.isArray(pagenumRaw) ? pagenumRaw[0] : (pagenumRaw ?? '1');
  const pageNum = Number.parseInt(pageStr, 10);
  
  // 兜底保护：防止非数字或者小于 1 的非正常输入
  return Number.isNaN(pageNum) || pageNum < 1 ? 1 : pageNum;
});

const totalPages = computed(() => Math.ceil(posts.value.length / pageSize));

// 2. 💡 列表截取随之联动
const paginatedPosts = computed(() => {
  const start = (currentPage.value - 1) * pageSize;
  return posts.value.slice(start, start + pageSize);
});

// 3. 💡 关键修改：跳转路由函数
// 点击上下页不再改变量，而是直接“提要求”换 URL 链接
const changePage = (page: number) => {
  if (page === 1) {
    // 第一页可以跳回不带参数的经典 /article 链接（看你个人喜好，也可以统一走下面）
    router.push('/article');
  } else {
    router.push(`/article/page/${page}`);
  }
};
</script>