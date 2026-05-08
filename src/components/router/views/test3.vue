<script setup lang="ts">
import { el, fa, he } from 'element-plus/es/locale/index.mjs';
import { Rss } from 'lucide-vue-next';
import { m } from 'vue-router/dist/router-CWoNjPRp.mjs';

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

function maxSubArray(nums: number[]): number {

    debugger

    let sum = 0;
    let sumLatter = 0;
    let Biggest = nums[0];
    let Smallest = 0;
    for (let i = 0;i < nums.length;i++) {
        sum += nums[i];
        if (i > 0) {
            sumLatter += nums[i - 1];
            Smallest = Math.min(Smallest, sumLatter);
        }
        Biggest = Math.max(Biggest, sum - Smallest);
    }

    return Biggest;
};

function merge_old(intervals: number[][]): number[][] {

    debugger

   intervals.sort((a, b) => a[0] - b[0]);
   let res:number[][] = [];
   let mergedInter:number[] = [intervals[0][0],intervals[0][1]];
   
    let compare = (a:number,b:number,toCheck:number):boolean => {
        return a <= toCheck && toCheck <= b;
    }

   for (let i = 0;i < intervals.length - 1;i++) {
     if (compare(mergedInter[0],mergedInter[1], intervals[i + 1][0]) || compare(mergedInter[0],mergedInter[1], intervals[i + 1][1])) {
        mergedInter[0] = Math.min(mergedInter[0],intervals[i + 1][0]);
        mergedInter[1] = Math.max(mergedInter[1],intervals[i + 1][1]);
     } else {
        res.push(mergedInter);
        mergedInter = [intervals[i + 1][0],intervals[i + 1][1]]
     }
   }

   res.push(mergedInter);

   return res;
};

function merge(intervals: number[][]): number[][] {

    intervals.sort((a, b) => a[0] - b[0]); 

    let res:number[][] = [intervals[0]];

    for (let i = 1;i < intervals.length;i++) {
        let last = res[res.length - 1];
        if (last[1] < intervals[i][0]) {
            res.push(intervals[i]);
        } else {
            if (last[1] < intervals[i][1]) {
                last[1] = intervals[i][1];
            }
        }
    }

    return res;
};

function productExceptSelf_old(nums: number[]): number[] {

    debugger

    let prefix = [nums[0]];
    let afterfix = [];
    afterfix[nums.length - 1] = nums[nums.length - 1];

    let res = [];

    for (let i = 1,j = nums.length - 2;i < nums.length,j > -1;i++,j--) {
        prefix[i] = nums[i] * prefix[i - 1] + 0;
        afterfix[j] = nums[j] * afterfix[j + 1] + 0;
    }

    for (let i = 0;i < nums.length;i++) {
        if (i - 1 < 0) {
            res[i] = afterfix[i + 1];
        } else if (i + 1 > nums.length - 1) {
            res[i] = prefix[i - 1];
        } else {
            res[i] = afterfix[i + 1] * prefix[i - 1] + 0;
        }
    }

    return res;
};

function productExceptSelf(nums: number[]): number[] {

    debugger

    let res = [nums[0]]
    for (let i = 1;i < nums.length;i++) {
        res[i] = nums[i] * res[i - 1] + 0;
    }

    let cal = 1;

    for (let j = nums.length - 1;j > -1;j--) {
        if (j - 1 > -1) {
            res[j] = res[j - 1] * cal + 0;
        } else {
            res[j] = cal + 0;
        }
        cal = cal * nums[j];
    }

    return res;
};

function firstMissingPositive_old(nums: number[]): number {

    debugger

    let Max = 1;
    let res = 0;

    for (let i = 0;i < nums.length;i++) {
        if (nums[i] <= nums.length) {
            Max = Math.max(Max, nums[i]);
        }
    }

    let window = Array(Max).fill(false);

    for (let i = 0;i < nums.length;i++) {
        if (nums[i] > 0 && nums[i] <= nums.length) {
            window[nums[i] - 1] = true;
        }
    }

    for (let i = 0;i < window.length;i++) {
        if (window[i] === false) {
            res = i + 1;
            break;
        }

        if (i === window.length - 1) {
            res = window.length + 1;
        }
    }

    return res;
};

function firstMissingPositive(nums: number[]): number {

    debugger
    
    let res = 0;
    
    for (let i = 0;i < nums.length;i++) {
        while (nums[i] > 0 && nums[i] < nums.length && nums[i] !== nums[nums[i] - 1]) {
            const j = nums[i] - 1;
            [nums[i], nums[j]] = [nums[j], nums[i]];
        }
    }

    for (let i = 0;i < nums.length;i++) {
        if (nums[i] !== i + 1) {
            res = i + 1;
            break;
        }
    }

    return res;
};

function setZeroes(matrix: number[][]): void {

    debugger

    let rowNum = matrix.length;
    let baseRow = -1;
    let flag = 0;

    const makeArrayAllZero = (arr:number[]):void => {
        for (let i = 0;i < arr.length;i++) {
            arr[i] = 0;
        }
    }

    for (let i = 0;i < rowNum;i++) {
        
        flag = 0;

        for (let j = 0;j < matrix[i].length;j++) {

            if (baseRow !== -1 && i !== baseRow) {
                if (matrix[i][j] === 0) {
                    flag = 1;
                    matrix[baseRow][j] = 0;
                }
            }

            if (matrix[i][j] === 0 && baseRow === -1) {
                baseRow = i;
                i = -1;
                break;
            }

        }

        if (flag === 1) {
            makeArrayAllZero(matrix[i]);
        }
    }

    if (baseRow !== -1)
    {
        for (let i = 0;i < rowNum;i++) {
            if (matrix[i][0] !== 0) {
                for (let j = 0;j < matrix[i].length;j++) {
                    if (matrix[baseRow][j] === 0) {
                        matrix[i][j] = 0;
                    }
                }
            }
        }
    
    makeArrayAllZero(matrix[baseRow]);
    
    }

};

function spiralOrder(matrix: number[][]): number[] {

    debugger

    let res:number[] = [];

    let l = 0;
    let r = 0;
    let u = 0;
    let d = 0;

    let lastRowIndex = matrix[0].length - 1;
    let lastColIndex = matrix.length - 1;

    while (1) {

        for (let i = l;i < matrix[u].length - r;i++) {
            res.push(matrix[u][i]);
        }

        u++;

        if (matrix.length - (d + u) === 0) {
            break;
        }

        for (let i = u;i < matrix.length - d;i++) {
            res.push(matrix[i][lastRowIndex - r]);
        }

        r++;
        if (matrix[0].length - (r + l) === 0) {
            break;
        }


        for (let i = lastRowIndex - r;i >= l;i--) {
            res.push(matrix[lastColIndex - d][i]);
        }

        d++;
        if (matrix.length - (d + u) === 0) {
            break;
        }


        for (let i = lastColIndex - d;i >= u;i--) {
            res.push(matrix[i][l]);
        }

        l++;
        if (matrix[0].length - (r + l) === 0) {
            break;
        }


    }

    return res;
};

function rotate(matrix: number[][]): void {
    matrix.reverse();

    let rowLen = matrix[0].length;

    for (let i = 0;i < matrix.length;i++) {
        for (let j = i + 1;j < rowLen;j++) {
            [matrix[i][j],matrix[j][i]] = [matrix[j][i],matrix[i][j]];
        }
    }
};

function searchMatrix_old(matrix: number[][], target: number): boolean {
    let list:[number,number][] = [[0,0]];

    for (let i = 0;i < list.length;i++) {
        let indexes = list[i] ?? [0,0];
        let y = indexes[0];
        let x = indexes[1];

        if (matrix[y][x] === target) {
            return true;
        }

        if (y + 1 < matrix.length) {
            if (matrix[y + 1][x] < target) {
                list.push([y + 1, x]);
            } else if (matrix[y + 1][x] === target) {
                return true;
            }
        }

        if (x + 1 < matrix[0].length) {
            if (matrix[y][x + 1] < target) {
                list.push([y, x + 1]);
            } else if (matrix[y][x + 1] === target) {
                return true;
            }
        }
    }

    return false;
};

function searchMatrix_old2(matrix: number[][], target: number): boolean {
    return searchMatrixRecur(matrix, target, 0, 0);
};

function searchMatrixRecur(matrix: number[][], target: number, x:number, y:number): boolean {

    if (y >= matrix.length || x >= matrix[0].length) {
        return false;
    }

    if (matrix[y][x] === target) {
        return true;
    }

    let downW = searchMatrixRecur(matrix, target, x, y + 1);
    let rightW = searchMatrixRecur(matrix, target, x + 1, y);

    return downW || rightW;
}

function searchMatrix_old3(matrix: number[][], target: number): boolean {

    for (let i = 0;i < matrix.length;i++) {
        for (let j = 0;j < matrix[0].length;j++) {
            if (matrix[i][j] === target) {
                return true;
            } else if (matrix[i][j] > target) {
                break;
            }
        }
    }

    return false;
};

function searchMatrix(matrix: number[][], target: number): boolean {
    let m = matrix.length;
    let n = matrix[0].length;

    if (matrix[0][0] > target || matrix[m - 1][n - 1] < target) {
        return false;
    }

    let i = 0;
    let j = n - 2;

    while (i < m || j >= 0) {
        if (matrix[i][j] === target) {
            return true;
        }
        if (matrix[i][j] > target) {
            j--;
        }
        if (matrix[i][j] < target) {
            i++;
        }
    }

    return false;
};

  class ListNode {
      val: number
      next: ListNode | null
      constructor(val?: number, next?: ListNode | null) {
          this.val = (val===undefined ? 0 : val)
          this.next = (next===undefined ? null : next)
      }
  }


/**
 * 根据数组快速生成链表
 */
function createLinkedList(arr: number[]): ListNode | null {
    if (arr.length === 0) return null;
    let head = new ListNode(arr[0]);
    let current = head;
    for (let i = 1; i < arr.length; i++) {
        current.next = new ListNode(arr[i]);
        current = current.next;
    }
    return head;
}

/**
 * 模拟评测系统的链表构建逻辑
 */
function buildIntersectingList(
    listAArr: number[], 
    listBArr: number[], 
    skipA: number, 
    skipB: number
): [ListNode | null, ListNode | null] {
    
    // 1. 创建两个完全独立的链表
    const headA = createLinkedList(listAArr);
    const headB = createLinkedList(listBArr);

    // 2. 如果不存在相交（intersectVal 为 0，通常对应 skipA/B 指向末尾之后）
    if (skipA >= listAArr.length || skipB >= listBArr.length) {
        return [headA, headB];
    }

    // 3. 找到 listA 中的相交节点
    let intersectNode: ListNode | null = headA;
    for (let i = 0; i < skipA; i++) {
        intersectNode = intersectNode?.next || null;
    }

    // 4. 找到 listB 中相交节点的前驱节点
    if (skipB === 0) {
        // 如果 listB 从头就开始相交，那么 headB 直接指向 intersectNode
        return [headA, intersectNode];
    } else {
        let prevB: ListNode | null = headB;
        for (let i = 0; i < skipB - 1; i++) {
            prevB = prevB?.next || null;
        }
        // 5. 将 listB 的断点指向 listA 中的节点，完成“Y”型构造
        if (prevB) {
            prevB.next = intersectNode;
        }
    }

    return [headA, headB];
}

function createLinkedListWithCycle(nums: number[], pos: number): ListNode | null {
    if (nums.length === 0) return null;

    const nodes: ListNode[] = [];
    
    // 1. 创建所有节点并存入数组，方便通过索引访问
    for (const val of nums) {
        nodes.push(new ListNode(val));
    }

    // 2. 串联节点
    for (let i = 0; i < nodes.length - 1; i++) {
        nodes[i].next = nodes[i + 1];
    }

    // 3. 根据 pos 建立环
    if (pos !== -1 && pos < nodes.length) {
        const tail = nodes[nodes.length - 1];
        tail.next = nodes[pos];
    }

    return nodes[0];
}

// --- 使用示例 ---
const listA = [4, 1, 8, 4, 5];
const listB = [5, 6, 1, 8, 4, 5];
const skipA = 2; // 指向 8
const skipB = 3; // 指向 8

const [headA, headB] = buildIntersectingList(listA, listB, skipA, skipB);

let test = createLinkedList([1,2,3,4]);
let test2 = createLinkedList([9,9,9,9]);
 
function getIntersectionNode(headA: ListNode | null, headB: ListNode | null): ListNode | null {
    
    let point = headA;
    let pointBigger = headA;
    let lenA = 0;
    let lenB = 0;

    while (point !== null) {
        lenA++;
        point = point.next;
    }

    point = headB;

    while (point != null) {
        lenB++;
        point = point.next;
    }

    let diff = Math.abs(lenB - lenA);

    [pointBigger,point] = lenA > lenB ? [headA,headB] : [headB,headA];

    for (let i = 0;i < diff - 1;i++) {
        pointBigger = pointBigger?.next ?? null;
    }

    if (pointBigger?.next === point) {
        return point;
    }

    if (diff !== 0) {
        pointBigger = pointBigger?.next ?? null;
    }

    while (point !== null) {

        if (point === pointBigger) {
            return point;
        }

        if (point.next === pointBigger?.next) {
            return point.next;
        } else {
            point = point.next;
            pointBigger = pointBigger?.next ?? null;
        }
    }

    return null;
};

function reverseList_recur(head: ListNode | null): ListNode | null {

    if (head === null) {
        return null;
    }

    if (head?.next === null) {
        return head;
    }
    
    let reversedListHead = reverseList_recur(head?.next ?? null);

    let point = reversedListHead;

    while (point?.next !== null) {
        point = point?.next ?? null;
    }

    if (point !== null) {
        if (head !== null) {
            head.next = null;
        }
        point.next = head;
    }

    return reversedListHead ?? null;
};

function reverseList_old(head: ListNode | null): ListNode | null {

    debugger;

    let tail = head;
    let len = 0;
    let i = 0;
    let point = head;

    if (tail === null) {
        return null;
    }

    while (tail.next !== null) {
        len++;
        tail = tail?.next;
    }

    while (i < len) {

        point = head;
        head = head?.next ?? null;

        if (point !== null) {
            point.next = tail?.next ?? null;
        }

        tail.next = point;

        i++;

    }

    return tail;

};

function reverseList(head: ListNode | null): ListNode | null {

    debugger

    let res = null;
    let p = head;

    while (p !== null) {
        const node = p.next;
        p.next = res;
        res = p;
        p = node;
    }

    return res;
};

function isPalindrome(head: ListNode | null): boolean {

    debugger

    let front = head;
    let after = head;

    while (front !== null && front.next !== null) {
        front = front.next.next;
        after = after?.next ?? null;

        if (front?.next === null) {
            after = after?.next ?? null;
        }
    }

    let point = reverseList(after);

    while (point !== null) {

        if (point?.val !== head?.val) {
            return false;
        }

        point = point?.next ?? null;
        head = head?.next ?? null;
    }

    return true;
};

function hasCycle(head: ListNode | null): boolean {
    let faster = head;
    let slower = head;

    while (faster?.next !== null && slower?.next !== null) {
        
        faster = faster?.next.next ?? null;

        slower = slower?.next ?? null;
        
        if (faster === slower || faster?.next === slower) {
            return false;
        }
    }

    return true;
};

function detectCycle(head: ListNode | null): ListNode | null {

    debugger

    let faster = head;
    let slower = head;
    let len = -1;

    while (faster?.next !== null && slower?.next !== null) {
        
        faster = faster?.next.next ?? null;

        slower = slower?.next ?? null;
        
        if (faster === slower || faster?.next === slower) {
            len = 0;
            let point = slower;
            do {
                point = point?.next ?? null;
                len++;
            } while (point !== slower)
            break;
        }
    }

    if (len === -1) {
        return null;
    } else {
        let point = head;

        for (let i = 0;i < len;i++) {
            point = point?.next ?? null;
        }

        while (point?.next !== head) {
            point = point?.next ?? null;
            head = head?.next ?? null;
        }

        return head;
    }
    
};

function mergeTwoLists(list1: ListNode | null, list2: ListNode | null): ListNode | null {

    debugger

    let p1 = list1;
    let p2 = list2;
    let head = null;

    if (list1 === null) {
        return list2;
    }

    if (list2 === null) {
        return list1;
    }

    if (list1 !== null && list2 !== null) {
        if (list1.val > list2.val) {
            head = list2;
            p2 = list2.next;
        } else {
            head = list1;
            p1 = list1.next;
        }
    }

    if (head === null) {
        return null;
    }

    const node = head;

    while (p1 !== null && p2 !== null) {
        if (p1.val > p2.val) {
            head.next = p2;
            p2 = p2.next;
            head = head.next;
        } else {
            head.next = p1;
            p1 = p1.next;
            head = head.next;
        }
    }

    if (p1 === null) {
        head.next = p2;
    }

    if (p2 === null) {
        head.next = p1;
    }

    return node;
};

function addTwoNumbers(l1: ListNode | null, l2: ListNode | null): ListNode | null {

    let remain = 0;
    let toAdd = 0;
    let total = 0;
    let head = new ListNode();
    let point = head;


    if (l1 === null && l2 === null) {
        return null;
    }

    let p1 = l1;
    let p2 = l2;

    while (p1 !== null || p2 !== null || toAdd !== 0) {

        total = toAdd;

        if (p1 === null && p2 !== null) {
            total = p2.val + toAdd;
            p2 = p2.next;
        }

        if (p2 === null && p1 !== null) {
            total = p1.val + toAdd;
            p1 = p1.next;
        }

        if (p1 !== null && p2 !== null) {
            total = p1.val + p2.val + toAdd;
            p1 = p1.next;
            p2 = p2.next;
        }
    
        remain = total % 10;
        if (total >= 10) {
            toAdd = (total - remain) / 10;
        } else {
            toAdd = 0;
        }

        let node = new ListNode();
        node.val = remain;
        point.next = node;
        point = point.next;
    }

    point.next = null;
    return head.next;
};

function removeNthFromEnd(head: ListNode | null, n: number): ListNode | null {
   
    let sential = new ListNode();
    sential.next = head;
    let lead_point:ListNode | null = sential;
    let point:ListNode | null = sential;
   
    for (let i = 0;i <= n;i++) {
        if (lead_point !== null) {
            lead_point = lead_point.next;
        }
   } 

   while (lead_point !== null) {
    lead_point = lead_point.next;
    point = point?.next ?? null;
   }

   if (point !== null) {
    point.next = point.next?.next ?? null;
   }

   return sential.next;
};

function swapPairs(head: ListNode | null): ListNode | null {

    debugger
    
    let memo = head;
    let lead = head;
    let second = head;
    let res = head;
    
    if (head === null) {
        return null;
    } else {
        lead = head.next;
    }

    if (lead === null) {
        return head;
    } else {
        if (second !== null) {
            second.next = lead.next;
            lead.next = second;
            res = lead;
            //swap
            const temp = second;
            second = lead;
            lead = temp;
            memo = lead;
        }
    }

        while (lead !== null && lead.next !== null) {
            if (second !== null) {
                second = lead.next;
                lead = lead.next.next;
            }

            if (lead === null) {
                return res;
            } else {
                if (second !== null) {
                    second.next = lead.next;
                    lead.next = second;
                    //swap
                    const temp:ListNode = second;
                    second = lead;
                    lead = temp;
                    if (memo !== null) {
                        memo.next = second;
                    }
                    memo = lead;
                }
            }
        }

    return res;

};

console.log(swapPairs(test));
/// console.log(addTwoNumbers(test,test2))
// console.log(detectCycle(test2))
// console.log(isPalindrome(test));
// console.log(reverseList(test));
// console.log(getIntersectionNode(headA, headB));
// let test = [[1,2,3],[4,5,6],[7,8,9]];
//     rotate(test)
// console.log(test);
// console.log(spiralOrder([[1,2,3,4],[5,6,7,8],[9,10,11,12]]))
// console.log(firstMissingPositive([100000, 3, 4000, 2, 15, 1, 99999]));
// console.log(productExceptSelf([1,2,3,4]));
// console.log(merge([[1,3],[2,6],[8,10],[15,18]]))
// console.log(maxSubArray([-2,1]))
// console.log(minWindow("acbbaca","aba"));
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