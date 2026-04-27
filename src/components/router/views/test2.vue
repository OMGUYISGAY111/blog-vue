<script setup lang="ts">
// 组件逻辑
function twoSum(nums: number[], target: number): number[] {
    const listMap = new Map<number, number>;
    let result:number[] = [];

    for (let i = 0;i < nums.length;i++) {

            const id = listMap.get(target - nums[i]);
            if (id !== undefined) {
                result = [i,id];
                break;
            } else {
                listMap.set(nums[i],i);
            }
    
    }

    return result;
};

function longestConsecutive(nums: number[]): number {
    const continueMap:Map<number, boolean> = new Map<number, boolean>;
    let maxLen = 0;

    for (let i of nums) {
        continueMap.set(i, false);
    }

    for (let i of continueMap.keys()) {

        let measureLen = 0;

        if (continueMap.get(i) === true) {
            continue;
        }

        while(continueMap.get(i - 1) !== undefined) {
            i--;
        }

        do {
            measureLen++;
            continueMap.set(i,true);
            i++;
        } while(continueMap.get(i) !== undefined)

        if (maxLen < measureLen) {
            maxLen = measureLen;
        }
    }

    return maxLen;

};

console.log(longestConsecutive([100,4,200,1,3,2]));
</script>

<template>
  <div>
    
  </div>
</template>

<style scoped>

</style>