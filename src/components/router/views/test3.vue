<script setup lang="ts">
import { el, fa, he } from 'element-plus/es/locale/index.mjs';

// 组件逻辑
function moveZeroes(nums: number[]): void {
    let numOfZero:number = 0;
    let curIndex:number = 0;
    for (let i = 0;i < nums.length;i++) {
        if (nums[i] === 0) {
            numOfZero++;
        } else {
            nums[curIndex] = nums[i];
            curIndex++;
        }
    }

    for (let i = nums.length - numOfZero;i < nums.length;i++) {
        nums[i] = 0;
    }
};

function maxArea(height: number[]): number {

    let curMaxHeight:number = 0;
    let curMaxArea:number = 0;

    for (let i = 0,j = height.length - 1;i != j;) {
        curMaxHeight = Math.min(height[i],height[j]);
        curMaxArea = Math.max(curMaxArea,curMaxHeight * (j - i));

        if (height[i] <= height[j]) {
            i++;
        } else {
            j--;
        }
    }

    return curMaxArea;
};

// function threeSum(nums: number[]): number[][] {
//     // debugger;
//     const mapNum = new Map<number, number>;

//     const res:number[][] = [];

//     for (let i = 0;i < nums.length;i++) {
//             let tmp = mapNum.get(nums[i]);
//             if (tmp !== undefined) {
//                 mapNum.set(nums[i], tmp + 1);
//             } else {
//                 mapNum.set(nums[i], 1);
//             }
//         }
    
//     const numList:number[] = [];

//     for (let i of mapNum.keys()) {
//         numList.push(i);
//     }

//     for (let i = 0;i < numList.length;i++) {
//         for (let j = i;j < numList.length;j++) {
//             let threeTuple:Array<number> = new Array(3);
//             if (hasThreeGroup(numList[i],numList[j],mapNum,threeTuple)) {
                    
//                 let flag = false;

//                     if (res.length === 0) {
//                         res.push(threeTuple);
//                         continue;
//                     }

//                 for (let i of res) {
//                     if (checkSame(i,threeTuple) === true) {
//                         flag = true
//                         continue;
//                     }
//                 }

//                 if (!flag) {
//                     res.push(threeTuple);
//                 }
//             }
//         }
//     }
    
//     return res;
// };

// function hasThreeGroup(numA:number, numB:number, numMap:Map<number,number>, threeTuple:Array<number>) {
//     // const copy = new Map(numMap);
    
//     const update = (key:number) => {
//         const oldVal = numMap.get(key) ?? 0;
//         numMap.set(key, oldVal - 1);
//         return oldVal - 1;
//     }

//     const aUpdate = update(numA);
//     const bUpdate = update(numB);

//     if (aUpdate < 0 || bUpdate < 0) {

//         addUpdate(numMap,numA);
//         addUpdate(numMap,numB);

//         return false;
//     }

//     let vaildC = numMap.get(0 - (numA + numB));

//     if (vaildC !== undefined && vaildC > 0) {
//         threeTuple[0] = numA;
//         threeTuple[1] = numB;
//         threeTuple[2] = 0 - (numA + numB);
        
//         addUpdate(numMap,numA);
//         addUpdate(numMap,numB);

//         return true;
//     } else {

//         addUpdate(numMap,numA);
//         addUpdate(numMap,numB);

//         return false;
//     }
// }

// function checkSame(numListA:number[],numListB:number[]) {
//     const mapA = new Map<number,number>;
//     const mapB = new Map<number,number>;

//     for (let i of numListA) {
//         addUpdate(mapA,i);
//     }

//     for (let b of numListB) {
//         addUpdate(mapB,b);
//     }

//     if (mapA.size !== mapB.size) {
//         return false;
//     }

//     for (let k of mapA.keys()) {
//         if (mapA.get(k) !== mapB.get(k)) {
//             return false;
//         }
//     }

//     return true;
// }

// function addUpdate(mapNum:Map<number,number>,key:number) {
//         let tmp = mapNum.get(key);
//             if (tmp !== undefined) {
//                 mapNum.set(key, tmp + 1);
//             } else {
//                 mapNum.set(key, 1);
//             }

// }

function threeSum(nums: number[]): number[][] {
    
    debugger;
    let res:number[][] = [];
    
    nums.sort((a,b) => a - b);

    for (let i = 0;i < nums.length - 2;) {
        if (i > 0 && nums[i] === nums[i - 1]) {
            i++;
            continue;
        }

        let left:number = i + 1;
        let right:number = nums.length - 1;
        let sum:number = nums[i] + nums[left] + nums[right];

        while (left < right) {
            if (sum < 0) {
                left++;
            } else if (sum > 0) {
                right--;
            }

            sum = nums[i] + nums[left] + nums[right];

            if (left !== right && sum === 0) {
                res.push([nums[i],nums[left],nums[right]]);
                
                while (left < nums.length - 1) {
                    if (nums[left + 1] === nums[left]) {
                        left++;
                    } else {
                        break;
                    }
                }
                left++;

                while (right > i + 1) {
                    if (nums[right - 1] === nums[right]) {
                        right--;
                    } else {
                        break;
                    }
                }
                right--;

                sum = nums[i] + nums[left] + nums[right];
            }

        }

        i++;
    }

    return res;
}

function trap_old(height: number[]): number {
    let leftGrad:number[] = [];
    let rightGrad:number[] = [];
    let leftStart:number = height[0];
    let rightStart:number = height[height.length - 1];
    let res:number = 0;

    for (let i = 0;i < height.length;i++) {
        if (leftStart < height[i]) {
            leftStart = height[i];
        }
        leftGrad[i] = leftStart;
    }

    for (let i = height.length - 1;i >= 0;i--) {
        if (rightStart < height[i]) {
            rightStart = height[i];
        }
        rightGrad[i] = rightStart;
    }

    let space:number[] = [];

    for (let i = 0;i < height.length;i++) {
        space[i] = Math.min(leftGrad[i],rightGrad[i]);
        res += space[i] - height[i];
    }

    return res;
};

function trap(height: number[]): number {
    let l = 0;
    let r = height.length - 1;
    let leftMax = height[0];
    let rightMax = height[r];
    let res:number = 0;

    while (l <= r) {
        if (leftMax < rightMax) {
            if (height[l] > leftMax) {
                leftMax = height[l];
            } else {
                res += leftMax - height[l];
            }

            l++;
        } else {
            if (height[r] > rightMax) {
                rightMax = height[r];
            } else {
                res += rightMax - height[r];
            }

            r--;
        }
    }

    return res;

}

function lengthOfLongestSubstring_old(s: string): number {

    debugger;

    let Maxcount:number = 0;
    let count = 0;
    let start = 0;
    let Status:Map<string,number> = new Map;

    for (let i = 0;i < s.length;i++) {
        if (Status.get(s[i]) === undefined) {
            Status.set(s[i],i);
            count++;

            if (Maxcount < count) {
                Maxcount = count;
            }

        } else if (Status.get(s[i]) !== undefined) {
            const StartIndex = Status.get(s[i]);
            if (StartIndex !== undefined) {
                i = StartIndex + 1;
            }
            count = 1;
            Status = new Map;
            Status.set(s[i],i);

            if (Maxcount < count) {
                Maxcount = count;
            }

        }
    }

    return Maxcount;
};

function lengthOfLongestSubstring(s: string): number {

    const subString:Set<string> = new Set;
    let l = 0;
    let ans = 0;
    
    for (let r = 0;r < s.length;r++) {

        while (subString.has(s[r])) {
            subString.delete(s[l++]);
        }
        
        if (!subString.has(s[r])) {
            subString.add(s[r]);
        }

        ans = Math.max(ans, r - l + 1);
    }

    return ans;
};

function findAnagrams(s: string, p: string): number[] {
    const pMap:Map<string, number> = new Map;
    let windowAppearMap:Map<string, number> = new Map;

    const windowLen = p.length;
    let curLen = 0;
    let res:number[] = [];

    for (let c of p) {
        const originValue = pMap.get(c) ?? 0;
        pMap.set(c, originValue + 1);
    }

    let l = 0;

    for (let r = 0;r < s.length;r++) {

        if (pMap.has(s[r])) {
    
            const appearNum = addAndReturnTimes(windowAppearMap,s[r]);
            const compareNum = pMap.get(s[r]) ?? -1;

            if (compareNum != -1 && appearNum > compareNum) {
                while(s[l] !== s[r]) {
                    minusAndReturnTimes(windowAppearMap,s[l]);
                    l++;
                }    
                minusAndReturnTimes(windowAppearMap,s[l]);
                l++;
            }

            curLen = r - l + 1;

            if (curLen < windowLen) {
                continue;
            } else if (curLen === windowLen) {
                if(compareTwoWord(pMap, windowAppearMap)) {
                    res.push(l);
                }
            } else {
                minusAndReturnTimes(windowAppearMap,s[l]);
                l++;
            }

        } else {
            windowAppearMap = new Map;
            l = r + 1;
            continue;
        }

    }

    return res;

};

function addAndReturnTimes(mapToAdd:Map<string, number>,key:string) {
    const value = mapToAdd.get(key) ?? 0;
    mapToAdd.set(key, value + 1);
    return value + 1;
}

function minusAndReturnTimes(mapToAdd:Map<string, number>,key:string) {
    const value = mapToAdd.get(key) ?? 0;
    if (value > 0) {
        mapToAdd.set(key, value - 1);
    }
    return value - 1;
}

function compareTwoWord(mapA:Map<string, number>, mapB:Map<string, number>) {
    if (mapA.size !== mapB.size) {
        return false;
    }

    for (let key of mapA.keys()) {
        if (mapA.get(key) !== mapB.get(key)) {
            return false;
        }
    }

    return true;
}

function subarraySum_old(nums: number[], k: number): number {

    debugger

    let curSum = 0;
    let res = 0;

    for (let i = 0;i < nums.length;i++) {
        let expand = i + 1;
        curSum = nums[i];

        if (curSum === k) {
            res++;
        }

        if (expand === nums.length) {
            continue;
        }

        while (expand < nums.length) {

            curSum += nums[expand++];
        
            if (curSum === k) {
                res++;
            }
        }

    }

    return res;
};

function subarraySum(nums: number[], k: number): number {
    let totalSumMap:Map<number, number> = new Map;
    let sum = 0;
    let res = 0;

    totalSumMap.set(0,1);

    for (let i = 0;i < nums.length;i++) {
        sum += nums[i];

        res += totalSumMap.get(sum - k) ?? 0;

        totalSumMap.set(sum, (totalSumMap.get(sum) ?? 0) + 1)
    }

    return res;
}

function maxSlidingWindow_old(nums: number[], k: number): number[] {

    

    debugger

    let l = 0;
    let r = l + k - 1;
    let MaxIndex = findMaxIndex(nums, l, r);
    let res:number[] = []

    for (let l = 0;l + k - 1 < nums.length;l++) {
        r = l + k - 1;

        if (l <= MaxIndex) {
            if (nums[r] >= nums[MaxIndex]) {
                MaxIndex = r;
            }
        } else {
            MaxIndex = findMaxIndex(nums, l, r);
        }

        res.push(nums[MaxIndex]);
    }

    return res;
};

function findMaxIndex(nums:number[], start:number, end:number): number {
    
    let MaxNum = nums[start];
    let MaxIndex = 0

    for (let i = start;i <= end;i++) {
        if (MaxNum <= nums[i]) {
            MaxIndex = i;
            MaxNum = nums[i];
        }
    }

    return MaxIndex;
}

function maxSlidingWindow(nums: number[], k: number): number[] {

    const queue:number[] = [];
    const ans:number[] = [];

    for (let l = 0;l < nums.length;l++) {

        if (queue.length && queue[0] <= l - k) {
            queue.shift();
        }


        //this 
        while (queue.length && nums[queue[queue.length - 1]] <= nums[l]) {
            queue.pop();
        }

        queue.push(l);

        if (l >= k - 1) {
            ans.push(nums[queue[0]]);
        }
        
    }

    return ans;
};

function minWindow(s: string, t: string): string {

    debugger;

    const tMap:Map<string, number> = new Map;
    let res:string = "";
    let keyIndexs:number[] = [];
    let fit = 0;
    let Tofit = 0;
    let minLen = -1;
    let minStart = -1;
    let baseIndex = 0;
    const sMap:Map<string, number> = new Map;

    for (let c of t) {
        tMap.set(c, (tMap.get(c) ?? 0) + 1);
    }

    for (let i of tMap.keys()) {
        fit++;
    }

    for (let i = 0;i < s.length;i++) {
        if (tMap.has(s[i])) {
            keyIndexs.push(i);
            let curVal = sMap.get(s[i]) ?? 0;
            let compareNum = tMap.get(s[i]) ?? 0;
            
            sMap.set(s[i], curVal + 1);

            if (curVal + 1 <= compareNum) {
                // sMap.set(s[i], curVal + 1);

                if (curVal + 1 === tMap.get(s[i])) {
                    Tofit++;
                }

            } else {

                let curIndex = keyIndexs[baseIndex];

                while(((sMap.get(s[curIndex]) ?? 0)) > (tMap.get(s[curIndex]) ?? 0)) {
                    
                    // curIndex = keyIndexs[0];
                    // sMap.set(s[i], curVal + 1);

                    // if (tMap.get(s[curIndex]) === (sMap.get(s[curIndex]) ?? 0)) {
                    //     Tofit--;
                    // }

                    //add
                    // if (((sMap.get(s[curIndex]) ?? 0) - 1) < (tMap.get(s[curIndex]) ?? 0)) {
                    //     break;
                    // }

                    sMap.set(s[curIndex], (sMap.get(s[curIndex]) ?? 0) - 1);

                    // keyIndexs.shift();
                    baseIndex++;
                    curIndex = keyIndexs[baseIndex];
                }

                //change
                // if (s[keyIndexs[0]] === s[i]) {
                //     keyIndexs.shift();
                // }

            }

            if (fit === Tofit) {

                let curLen = keyIndexs[keyIndexs.length - 1] - keyIndexs[baseIndex] + 1;

                if (minLen === -1) {
                    minLen = curLen;
                    minStart = keyIndexs[baseIndex];
                } else {

                    if (minLen > curLen) {
                        minLen = Math.min(curLen, minLen);
                        minStart = keyIndexs[baseIndex];
                    }
                }

            }
        }
    }

    if (minStart === -1) {
        return "";
    } else {
        return s.substring(minStart, minStart + minLen);
    }
};

console.log(minWindow("acbbaca","aba"));
// console.log(minWindow("aaaaaaaaaaaabbbbbcdd","abcdd"));
// console.log(maxSlidingWindow([1,-1],1))
// console.log(subarraySum([-1,-1,1],0))
// console.log(findAnagrams("abab","ab"));
// console.log(lengthOfLongestSubstring("ddddd"));
// console.log(trap([4,2,0,3,2,5]))
// console.log(threeSum([1,2,0,1,0,0,0,0]));
</script>

<template>
  <div>
    
  </div>
</template>

<style scoped>

</style>