<script setup lang="ts">
// 组件逻辑
const myMap = new Map<number, number>();

function climbStairs(n: number): number {
    
    let a:number,b:number

    if (n < 0) {
        return 0;
    }

    if (n == 0) {
        return 1;
    }

    a = myMap.get(n - 1) ?? climbStairs(n - 1);
    b = myMap.get(n - 2) ?? climbStairs(n - 2);

    let res:number = a + b;
    myMap.set(n, res);

    return res;
};

function generate_bad(numRows: number): number[][] {

    if (numRows == 1) {
        return [[1]]
    }

    let dpArr:number[][] = []
    dpArr[0] = [1]
    // dpArr[1] = [1,1]

    for (let i = 1;i < numRows;i++) {
        let nArr:number[] = []
        for (let j = 0;j <= dpArr[i - 1].length;j++) {
            let a = j - 1 >= 0 ? dpArr[i - 1][j - 1] : 0
            let b = j < dpArr[i - 1].length ? dpArr[i - 1][j] : 0

            nArr[j] = a + b
        }
        dpArr.push(nArr)
    }

    return dpArr
};

function generate(numRows: number): number[][] {
    let dpArr:number[][] = new Array(numRows)

    for (let i = 0;i < numRows;i++) {
        dpArr[i] = new Array(i + 1).fill(1);
        dpArr[i][0] = 1
        dpArr[i][i] = 1

        for (let j = 1;j < i;j++) {
            dpArr[i][j] = dpArr[i - 1][j - 1] + dpArr[i - 1][j]
        }

    }

    return dpArr;
}

function rob(nums: number[]): number {
    let maxDp:Array<number> = new Array(nums.length);
    
    maxDp[0] = nums[0]
    maxDp[1] = Math.max(nums[0], nums[1])

    for (let i = 2;i < nums.length;i++) {
        maxDp[i] = Math.max((nums[i] + maxDp[i - 2]), maxDp[i - 1])
    }

    return maxDp[nums.length - 1];
};

function numSquares(n: number): number {

    let Mindp:Array<number> = new Array(n + 1);

    Mindp[0] = 0;
    Mindp[1] = 1;
    Mindp[2] = 2;

    for (let i = 3;i <= n;i++) {
        let closestSq = Math.trunc(Math.sqrt(i));

        if (closestSq < 2) {
            Mindp[i] = 1 + Mindp[i - Math.pow(closestSq, 2)]
        } else {
            let curMin = Mindp[i - Math.pow(closestSq, 2)];
            for (let j = 1;j < closestSq;j++) {
                curMin = Math.min(curMin, Mindp[i - Math.pow(j, 2)]);
            }
            Mindp[i] = 1 + curMin;
        }
    }

    return Mindp[n];
};

function coinChange(coins: number[], amount: number): number {

    let Amountdp:Array<number> = new Array(amount + 1);

    Amountdp[0] = 0;
    let sortedCoins = coins.sort((a, b) => a - b)
    
    for (let i = 1;i <= amount;i++) {
        if (i < sortedCoins[0]) {
            Amountdp[i] = -1
        } else if (i == sortedCoins[0]) {
            Amountdp[i] = 1
        } else {

            Amountdp[i] = Amountdp[i - sortedCoins[0]];

            for (let j = 0;j < sortedCoins.length;j++) {
            
                if (i < sortedCoins[j]) {
                    break;
                }

                if (Amountdp[i - sortedCoins[j]] == -1) {
                    continue;
                }

                if (Amountdp[i - sortedCoins[j]] != -1 && Amountdp[i] == -1) {
                    Amountdp[i] = Amountdp[i - sortedCoins[j]]
                }

                Amountdp[i] = Math.min(Amountdp[i],Amountdp[i - sortedCoins[j]])
            }

            if (Amountdp[i] != -1) {
                Amountdp[i]++;
            }

        }
    }

    return Amountdp[amount];
};

function numIslands(grid: string[][]): number {

    debugger

    let count = 0;
    let height = grid.length,weight = grid[0].length;

    for (let y = 0;y < height;y++) {
        for (let x = 0;x < weight;x++) {
            if (grid[y][x] == '1') {
                fuckUpIsland(grid,x,y);
                count++;
            }
        }
    }

    return count;
};

function fuckUpIsland(grid: string[][], x:number, y:number) {

    let newGrid = grid;

    if (x >= 0 && x < grid[0].length && y >= 0 && y < grid.length) {
        if (newGrid[y][x] == '1') {
            newGrid[y][x] = '0';
            newGrid = fuckUpIsland(newGrid, x-1, y)
            newGrid = fuckUpIsland(newGrid, x+1, y)
            newGrid = fuckUpIsland(newGrid, x, y-1)
            newGrid = fuckUpIsland(newGrid, x, y+1)
        }
    }

    return newGrid;

}

function orangesRotting(grid: number[][]): number {

    // debugger

    type Coord = [x:number,y:number]
    
    let remainOrange:Array<Coord> = new Array<Coord>();
    let height = grid.length, weight = grid[0].length, round = 0;

    //init
    for (let y = 0;y < height;y++) {
        for (let x = 0;x < weight;x++) {
            if (grid[y][x] == 2) {
                findNewBadOrange(grid,x + 1,y,remainOrange)
                findNewBadOrange(grid,x - 1,y,remainOrange)
                findNewBadOrange(grid,x,y + 1,remainOrange)
                findNewBadOrange(grid,x,y - 1,remainOrange)
            }
        }
    }

    while (remainOrange.length != 0) {

        let newRemainOrange:Array<Coord> = new Array<Coord>();

        for (let coord of remainOrange) {
            let x = coord[0],y = coord[1];
            grid[y][x] = 2;
            findNewBadOrange(grid,x + 1,y,newRemainOrange)
            findNewBadOrange(grid,x - 1,y,newRemainOrange)
            findNewBadOrange(grid,x,y + 1,newRemainOrange)
            findNewBadOrange(grid,x,y - 1,newRemainOrange)
        }

        remainOrange = new Array<Coord>();

        for (let coord of newRemainOrange) {

            let x = coord[0],y = coord[1];

            if (grid[y][x] !== 2) {
                remainOrange.push(coord);
            }
        }

        round++;
    
    }

    //check
    for (let y = 0;y < height;y++) {
        for (let x = 0;x < weight;x++) {
            if (grid[y][x] == 1) {
                return -1;
            }
        }
    }

    return round;

};

function findNewBadOrange(grid: number[][], x:number, y:number, remain:Array<[x:number,y:number]>) {
    let newGrid = grid;

    if (x >= 0 && x < grid[0].length && y >= 0 && y < grid.length) {
        if (newGrid[y][x] == 1) {
            remain.push([x,y]);
        }
    }
}

//map 3
type id = number;

interface fromToPair {
    from: number[]
    to: number[]
}

function canFinish2(numCourses: number, prerequisites: number[][]): boolean {

    let checkedCourses:Array<number> = new Array<number>(numCourses).fill(0);
    let FromToMap:Map<id,fromToPair> = new Map<id,fromToPair>();
    let startArray:number[] = [];

    //corner
    if (prerequisites.length == 0) {
        return true;
    }

    //init map
    for (let p of prerequisites) {

        if (p[1] == p[0]) {
            return false;
        }

        let fromNode = p[1],toNode = p[0];

        if (FromToMap.has(fromNode)) {
            FromToMap.get(fromNode)?.to.push(toNode)
        } else {

            let FromPair:fromToPair = {
                from: [],
                to: [toNode]
            }

            FromToMap.set(fromNode,FromPair)
        }

        if (FromToMap.has(toNode)) {
            FromToMap.get(toNode)?.from.push(fromNode)
        } else {

            let ToPair:fromToPair = {
                from: [fromNode],
                to: []
            }

            FromToMap.set(toNode,ToPair)
        }

    }   

    //get start
    for (let start of FromToMap) {
        if (start[1].from.length == 0) {
            startArray.push(start[0]);
        }
    }

    if (startArray.length == 0) {
        return false;
    }

    checkedCourses = new Array<number>(numCourses).fill(0);

    //fuck every start
    for (let start = 0;start < numCourses;start++) {

        if (checkedCourses[start] == 2) {
            continue;
        }
        
        if (!DFS(checkedCourses,start,FromToMap)) {
            return false;
        }

    }

    return true;
};

function DFS(checked:number[], id:number, FromToMap:Map<id,fromToPair>) {
    let nextArr = FromToMap.get(id)?.to ?? [];
    let curCheck = checked;

    if (curCheck[id] == 2) {
        return true;
    }

    curCheck[id] = 1;

    if (nextArr.length != 0) {
        for (let next of nextArr) {
            if (curCheck[next] == 1) {
                return false;
            }
            if (!DFS(curCheck,next,FromToMap)) {
                return false;
            }
        }
    }

    curCheck[id] = 2;
    return true;
}

function canFinish(numCourses: number, prerequisites: number[][]): boolean {
    let status = Array(numCourses).fill(0);
    let pre:number[][] = Array.from({ length: numCourses }, () => []);

    // 首先把所有课的前置课程收集起来
    for(let i=0;i<prerequisites.length;i++) {
        const [x,y] = prerequisites[i];
        pre[x].push(y);
    }

    function dfs(index: number) {
        if(status[index] === 1) return false;
        if(status[index] === 2) return true;
        status[index] = 1;

        const pres = pre[index];
        for(const item of pres) {
            if(!dfs(item)) return false;
        }

        status[index] = 2;
        return true;
    }

    for(let i=0;i<pre.length;i++) {
        if(!dfs(i)) {
            return false;
        }
    }

    return true;
};

class Trie {

    isEnd:boolean
    nextTrie:Map<string,Trie> | null;

    constructor() {
        this.nextTrie = null;
        this.isEnd = false;
    }

    insert(word: string): void {
        
        let curPos:Trie = this;
        
        for (let char of word) {

            let newTrie = new Trie();

            if (curPos.nextTrie !== null) {
                const nextPath = curPos.nextTrie.get(char)
                if (nextPath !== undefined) {
                    curPos = nextPath;
                    continue;
                } else {
                    curPos.nextTrie.set(char,newTrie);
                }
            } else {
                curPos.nextTrie = new Map<string,Trie>
                curPos.nextTrie.set(char,newTrie);
            }

            curPos = newTrie;
        }

        curPos.isEnd = true;
    }

    search(word: string): boolean {

        let curPos:Trie = this;

        for (let char of word) {

            const next = curPos.nextTrie;

            if (next == null) {
                return false
            } else {
                if (!next.has(char)) {
                    return false;
                } else {
                    const nextPos = next.get(char)
                    if (nextPos !== undefined) {
                        curPos = nextPos;
                    }
                }
            }
        }

        return curPos.isEnd;
    }

    startsWith(prefix: string): boolean {
                let curPos:Trie = this;

        for (let char of prefix) {

            const next = curPos.nextTrie;

            if (next == null) {
                return false
            } else {
                if (!next.has(char)) {
                    return false;
                } else {
                    const nextPos = next.get(char)
                    if (nextPos !== undefined) {
                        curPos = nextPos;
                    }
                }
            }
        }

        return true;
    }
}

function isValid(s: string): boolean {
    let stack:string[] = [];

    type leftKuohao = "{" | "(" | "[";
    type rightKuohao = '}' | ")" | "]"

    const bracketMap = new Map([
        ['{', '}'],
        ['(', ')'],
        ['[', ']']
    ]);

    const leftKuohaoSet = new Set<leftKuohao>(['(','[','{'])
    const rightKuohaoSet = new Set<rightKuohao>([')',']','}'])

    for (let char of s) {
        if (stack.length !== 0) {
            const lastIndex = stack.length - 1;
            const lastChar = stack[lastIndex];
            const responseChar = bracketMap.get(lastChar)
            if (rightKuohaoSet.has(char as any)) {
                if (responseChar !== undefined) {
                    if (responseChar !== char) {
                        return false;
                    } else {
                        stack.pop();
                    }
                }
            } else {
                stack.push(char)
            }
        } else {
            if (rightKuohaoSet.has(char as any)) {
                return false;
            }
            stack.push(char);
        }
    }

    return stack.length === 0;

};

class MinStack {

    minStack:number[]
    bigStack:number[]
    mainStack:number[]

    constructor() {
        this.minStack = [];
        this.bigStack = [];
        this.mainStack = [];
    }

    push(value: number): void {
        if (this.minStack.length == 0 && this.bigStack.length == 0) {
            this.minStack.push(value)
        } else {
            const minTopInd = this.minStack.length - 1, bigTopInd = this.bigStack.length - 1;
            const minTop = this.minStack[minTopInd], bigTop = this.bigStack[bigTopInd]

            if (value <= minTop) {
                this.minStack.push(value)
            } else {
                this.bigStack.push(value)
            }

        }

        this.mainStack.push(value);
    }

    pop(): void {

        const minTopInd = this.minStack.length - 1, bigTopInd = this.bigStack.length - 1;
        const minTop = this.minStack[minTopInd], bigTop = this.bigStack[bigTopInd]

        let value = this.mainStack.pop();

        if (value == minTop) {
            this.minStack.pop()
        } else {
            this.bigStack.pop()
        }

    }

    top(): number {
        return this.mainStack[this.mainStack.length - 1];
    }

    getMin(): number {
        return this.minStack[this.minStack.length - 1]
    }
}

function decodeString(s: string): string {

  const numStack:number[] = [];
  const stringStackCollab:string[] = []
  let stringStackCurPos = 0;
  stringStackCollab[0] = ''

  for (let i = 0;i < s.length;i++) {

    let char = s[i];

    if (char === '[') {
        stringStackCurPos++;
        stringStackCollab[stringStackCurPos] = ''
    } else if (char === ']') {
        const repeatNum = numStack.pop() ?? 0;
        const repeatStr = stringStackCollab.pop() ?? "";
        const finishStr = repeatStr.repeat(repeatNum);
        stringStackCurPos--;
        stringStackCollab[stringStackCurPos] += finishStr;
    } else if (Number.isInteger(Number.parseInt(char))) {
        let numStr = '';
        while (Number.isInteger(Number.parseInt(s[i]))) {
            numStr += s[i];
            i++
        }
        numStack.push(Number.parseInt(numStr));
        i--;
    } else {
        stringStackCollab[stringStackCurPos] += char;
    }
  }

  return stringStackCollab[0];

};

function dailyTemperatures(temperatures: number[]): number[] {
    
};

// console.log(decodeString("3[z]2[2[y]pq4[2[jk]e1[f]]]ef"))
//console.log(orangesRotting([[2,2],[1,1],[0,0],[2,0]]))
let wtf = [[1,0],[2,0],[2,1],[3,1],[3,2],[4,2],[4,3],[5,3],[5,4],[6,4],[6,5],[7,5],[7,6],[8,6],[8,7],[9,7],[9,8],[10,8],[10,9],[11,9],[11,10],[12,10],[12,11],[13,11],[13,12],[14,12],[14,13],[15,13],[15,14],[16,14],[16,15],[17,15],[17,16],[18,16],[18,17],[19,17],[19,18],[20,18],[20,19],[21,19],[21,20],[22,20],[22,21],[23,21],[23,22],[24,22],[24,23],[25,23],[25,24],[26,24],[26,25],[27,25],[27,26],[28,26],[28,27],[29,27],[29,28],[30,28],[30,29],[31,29],[31,30],[32,30],[32,31],[33,31],[33,32],[34,32],[34,33],[35,33],[35,34],[36,34],[36,35],[37,35],[37,36],[38,36],[38,37],[39,37],[39,38],[40,38],[40,39],[41,39],[41,40],[42,40],[42,41],[43,41],[43,42],[44,42],[44,43],[45,43],[45,44],[46,44],[46,45],[47,45],[47,46],[48,46],[48,47],[49,47],[49,48],[50,48],[50,49],[51,49],[51,50],[52,50],[52,51],[53,51],[53,52],[54,52],[54,53],[55,53],[55,54],[56,54],[56,55],[57,55],[57,56],[58,56],[58,57],[59,57],[59,58],[60,58],[60,59],[61,59],[61,60],[62,60],[62,61],[63,61],[63,62],[64,62],[64,63],[65,63],[65,64],[66,64],[66,65],[67,65],[67,66],[68,66],[68,67],[69,67],[69,68],[70,68],[70,69],[71,69],[71,70],[72,70],[72,71],[73,71],[73,72],[74,72],[74,73],[75,73],[75,74],[76,74],[76,75],[77,75],[77,76],[78,76],[78,77],[79,77],[79,78],[80,78],[80,79],[81,79],[81,80],[82,80],[82,81],[83,81],[83,82],[84,82],[84,83],[85,83],[85,84],[86,84],[86,85],[87,85],[87,86],[88,86],[88,87],[89,87],[89,88],[90,88],[90,89],[91,89],[91,90],[92,90],[92,91],[93,91],[93,92],[94,92],[94,93],[95,93],[95,94],[96,94],[96,95],[97,95],[97,96],[98,96],[98,97],[99,97]]
// console.log(canFinish(100,wtf));
//console.log(orangesRotting([[2,1,1],[1,1,0],[0,1,1]]))
// console.log(numIslands([["1","1","1","1","0"],["1","1","0","1","0"],["1","1","0","0","0"],["0","0","0","0","0"]]))
// console.log(coinChange([186,419,83,408],6249))
// console.log(rob())
// console.log(numSquares(48))
// console.log(generate(3))
// console.log(climbStairs(3));

</script>

<template>
  <div>
    
  </div>
</template>

<style scoped>

</style>