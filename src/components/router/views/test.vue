<script setup lang="ts">
import { colProps } from 'element-plus/lib';
import { el } from 'element-plus/lib/locale/index.js';

// 组件逻辑
  function groupAnagrams(strs: string[]): string[][] {
    const strMap = new Map<string,string[]>;
    const result:string[][] = [];

    for (let s of strs) {
      const key = generateTextSign(s);
      if (strMap.has(key)) {
        strMap.get(key)?.push(s);
      } else {
        strMap.set(key,[s]);
      }
    }

    for (const [key, value] of strMap) {
      result.push(value);
    }

    return result;
  };

  function generateTextSign(str:string):string {
    const alphaTable:number[] = new Array(26).fill(0);
    let index = 0;
    let key:string = '';

    for (let a of str) {
      index = charToindex(a);
      alphaTable[index] += 1;
    }

    for (let i = 0;i < 26;i++) {
      key = key.concat(String.fromCharCode('a'.charCodeAt(0) + i),alphaTable[i].toString());
    }

    return key;
    
  }

  function charToindex(letter:string):number {
    return letter.charCodeAt(0) - 'a'.charCodeAt(0);
  }

  console.log(generateTextSign("asdfd"))

  console.log(groupAnagrams([""]))
</script>

<template>
  <div>
    <p>true</p>
  </div>
</template>

<style scoped>

</style>