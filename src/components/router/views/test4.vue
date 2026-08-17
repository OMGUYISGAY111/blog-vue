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

function canFinish(numCourses: number, prerequisites: number[][]): boolean {

    debugger

    // type id = number;

    // interface fromToPair {
    //     from: number[]
    //     to: number[]
    // }


    let checkedCourses:Array<Boolean> = new Array<Boolean>(numCourses).fill(false);
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

    //fuck every start
    for (let start of startArray) {

        checkedCourses = new Array<Boolean>(numCourses).fill(false);
        let nextTarget:Set<number> = new Set<number>();
        nextTarget.add(start)

        while (nextTarget.size != 0) {
            
            let newNextTarget:number[] = [];
            
            for (let next of nextTarget) {
                
                if (checkedCourses[next]) {
                    return false;
                }
                
                let nextArr = FromToMap.get(next)?.to ?? [];
                checkedCourses[next] = true;

                for (let newNext of nextArr) {
                    newNextTarget.push(newNext);
                }
            }

            nextTarget.clear();
            for (let newNext of newNextTarget) {
                nextTarget.add(newNext);
            }
        }

    }

    return true;
};

function DFS(checked:boolean[], id:number, FromToMap:Map<id,fromToPair>) {
    let nextArr = FromToMap.get(id)?.to ?? [];
    let curCheck = checked;

    if (curCheck[id]) {
        return false;
    }
    
    curCheck[id] = true;

    if (nextArr.length == 0) {
        return true;
    } else {
        for (let next of nextArr) {
            if (!DFS(curCheck,next,FromToMap)) {
                return false;
            }
        }
    }
}

console.log(canFinish(3,[[0,1],[0,2],[1,2]]));
//console.log(orangesRotting([[2,2],[1,1],[0,0],[2,0]]))

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