<script setup lang="ts">
import { ArrowBigLeft, Menu, MenuIcon } from 'lucide-vue-next';
import { ref, inject, watch, onMounted, onUnmounted, type Ref } from 'vue';
import { useRoute } from 'vue-router';

const artNav = ref<HTMLElement | null>(null);
const showList = ref(false);
const showListButton = ref(false);

const route = useRoute();

watch(() => route.path,() => {
    const pathStr:string = route.path;
    pathStr.includes('/article/post') ?
        showListButton.value = true
    :
        showListButton.value = false;
});

const sharedHeading:Ref<HeadingItem[]> = inject<Ref<HeadingItem[]>>('sharedHeading', ref([]));

function onClick() {
    showList.value = !showList.value;
}

function onDocumentClick(e: MouseEvent) {
    if (artNav.value && !artNav.value.contains(e.target as Node)) {
        showList.value = false;
    }
}

onMounted(() => {
    document.addEventListener('click', onDocumentClick);
});

onUnmounted(() => {
    document.removeEventListener('click', onDocumentClick);
});

function scrollToHeading(heading: HeadingItem) {
    const target = document.getElementById(heading.text);
    if (target) target.scrollIntoView({ behavior: 'smooth' });
}


</script>

<template>
  <div ref="artNav" class="art-nav fixed bottom-19 right-6 rounded-[10px] bg-gray-600">
    <div v-if="showList"  class=" p-2 fixed bottom-19 right-[4.2rem] rounded-[10px] bg-gray-600 max-h-[20vh] max-w-[300px] overflow-y-auto list-container">
        <p v-if="!sharedHeading || sharedHeading.length === 0" class="list-art pl-2">no heading in this article:(</p>
        <ul v-else class="list-art space-y-1">
            <li v-for="(heading, idx) in sharedHeading" :key="idx" :class="{
                'pl-0 font-semibold border-l-2 border-blue-500 ': heading.level === 1,
                'pl-4': heading.level === 2,
                'pl-8': heading.level === 3
            }">
                <a
                    :href="`#${heading.text}`"
                    class="pl-1 block truncate text-sm hover:text-blue-300 transition-colors"
                    @click.prevent="scrollToHeading(heading)"
                >{{ heading.display }}</a>
            </li>
        </ul>
    </div>
    <div v-else></div>

    <button v-if="showListButton" @click="onClick" class=" p-2"><MenuIcon></MenuIcon></button>
    <div v-else></div>

  </div>
</template>

<style scoped>

    @keyframes fadeIn {
        from { opacity: 0; }
        to   { opacity: 1; }
    }

    .list-container {
        animation: fadeIn 0.4s cubic-bezier(0.165, 0.84, 0.44, 1);
        scrollbar-width: none;
        padding-left: 0;
    }

    .list-art {
        text-overflow: ellipsis;
        text-align: left;
    }

    .art-nav {
        transition: opacity 0.2s ease-in;
        opacity: 1;
        
    }

    .art-nav:hover {
        opacity: 1;
    }

</style>