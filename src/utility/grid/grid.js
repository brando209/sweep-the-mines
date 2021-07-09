export const DIFFICULTY = {
    EASY: 'easy',
    MEDIUM: 'medium',
    HARD: 'hard',
}

export const GRID_VALUE = {
    UNSELECTED: 'unselected',
    SELECTED: 'selected',
    FLAGGED: 'flagged',
    BOMBED: 'bombed',
}

const neighbors = [
    [-1, -1], [0, -1], [1, -1],
    [-1,  0],          [1,  0],
    [-1,  1], [0,  1], [1,  1]
]

export const getTotalBombCount = (difficulty) => {
    if(difficulty === DIFFICULTY.EASY) return 15;
    if(difficulty === DIFFICULTY.MEDIUM) return 40;
    if(difficulty === DIFFICULTY.HARD) return 60;
}

export const getGridSize = (difficulty) => {
    if (difficulty === "hard") return 20;
    if (difficulty === "medium") return 15;
    return 10;
}

export const countNeighboringBombs = (grid, rowIdx, colIdx) => {
    let bombCount = 0;
    neighbors.forEach(neighbor => {
        const neighborExists = grid[(rowIdx + neighbor[0])] && grid[(rowIdx + neighbor[0])][(colIdx + neighbor[1])];
        const neighborIsBomb = neighborExists && grid[(rowIdx + neighbor[0])][(colIdx + neighbor[1])].isBomb;
        if(neighborIsBomb) {
            bombCount++;
        }
    });
    return bombCount;
}

export const getNeighborIndices = (gridSize, rowIdx, colIdx) => {
    const neighborIndices = [];
    for(let neighbor of neighbors) {
        const xIdx = rowIdx + neighbor[0];
        const yIdx = colIdx + neighbor[1];
        if(xIdx >= 0 && xIdx < gridSize && yIdx >= 0 && yIdx < gridSize) neighborIndices.push([xIdx, yIdx]);
    }
    return neighborIndices;
}

export const generateInitialGrid = (difficulty) => {
    const size = getGridSize(difficulty);
    const bombCount = getTotalBombCount(difficulty);
    const bombLocations = generateUniqueTuples(bombCount, size);
    let bombLocationsInRow, isBombLocation;
    const grid = [];
    for(let i = 0; i < size; i++) {
        bombLocationsInRow = bombLocations.filter(bomb => bomb.x === i);
        const row = [];
        for(let j = 0; j < size; j++) {
            isBombLocation = bombLocationsInRow.find(bomb => bomb.y === j) ? true : false;
            row.push({ value: GRID_VALUE.UNSELECTED, isBomb: isBombLocation });
        }
        grid.push(row);
    }
    return grid;
}

    /*
        =========================================
        GRID UPDATE ALGORITHM
        =========================================
        INPUTS: 
            grid, the current state of the grid
            rowIdx, the row index of the selected cell
            colIdx, the column index of the selected cell
        OUTPUT:
            grid, the updated state of the grid

        PROCEDURE:
            1. Let C = the cell at grid[rowIdx][colIdx].
            2. IF C is a bomb, game over. ELSE continue to step 3.
            3. Initialize a queue, Q, and a hash map, visited
            4. Count the number of neighboring bombs to C.
                4.1 IF the number of neighboring bombs is not zero, display the neighboring bomb count on C
                    and let C.value = "selected".
                4.2 ELSE display a blank on C, let C.value = "selected", and push all neighbors of C onto Q 
                    (which are not "selected" and do not exist in visited) and create entry in visited
                    4.2.1 IF Q is empty, grid is updated
                    4.2.2 ELSE let C = Q.pop()
                        4.2.2.1 Repeat step 4.
    */

export const updateGrid = (grid, rowIdx, colIdx) => {
    let currentCell = grid[rowIdx][colIdx];
    if(currentCell.isBomb) { 
        grid[rowIdx] = [...grid[rowIdx]];  //DO NOT MUTATE ROW, MAKE COPY
        grid[rowIdx][colIdx] = { ...grid[rowIdx][colIdx], value: GRID_VALUE.SELECTED + " " + GRID_VALUE.BOMBED }
        return grid; 
    }

    const Q = [];   //Very slow as a queue for large amount of items
    Q.push([rowIdx, colIdx]);

    const visited = new Map();
    visited.set(`(${rowIdx},${colIdx})`, true);

    while(Q.length > 0) {
        let [x, y] = Q.shift();
        let neighborIndices;
        let neighborBombCount = countNeighboringBombs(grid, x, y);
        grid[x] = [...grid[x]] //DO NOT MUTATE ROW, MAKE COPY
        if(neighborBombCount > 0) {
            grid[x][y] = { ...grid[x][y], value: "selected", display: neighborBombCount };
        } else {
            grid[x][y] = { ...grid[x][y], value: "selected", display: " " };
            neighborIndices = getNeighborIndices(grid.length, x, y);
            neighborIndices.forEach(neighbor => {
                if(neighbor.value !== "selected" && !visited.has(`(${neighbor[0]},${neighbor[1]})`)) {
                    Q.push(neighbor);
                    visited.set(`(${x},${y})`, true);
                } 
            });
        }   
    }

    return grid;
}

export const toggleFlag = (grid, rowIdx, colIdx) => {
    if(grid[rowIdx][colIdx].value === GRID_VALUE.SELECTED) return grid;
    const newValue = (grid[rowIdx][colIdx].value === GRID_VALUE.UNSELECTED) ? GRID_VALUE.FLAGGED : GRID_VALUE.UNSELECTED;
    grid[rowIdx] = [...grid[rowIdx]];   //DO NOT MUTATE ROW, MAKE COPY
    grid[rowIdx][colIdx] = { ...grid[rowIdx][colIdx], value: newValue}
    return grid;
}

export const checkWin = (grid) => {
    let win = true;
    for(let row of grid) {
        for(let cell of row) {
            let values = cell.value.split(' ');
            for(let value of values) {
                if(value === GRID_VALUE.UNSELECTED || (value === GRID_VALUE.FLAGGED && cell.isBomb === false)) {
                    win = false;
                    break;
                }
            }
            if(!win) break;
        };
        if(!win) break;
    };
    return win;
}

export const checkLose = (grid) => {
    let lose = false;
    for(let row of grid) {
        for(let cell of row) {
            let values = cell.value.split(' ');
            for(let value of values) {
                if(value === GRID_VALUE.BOMBED && cell.isBomb === true) {
                    lose = true;
                    break;
                }
            }
            if(lose) break;
        };
        if(lose) break;
    };
    return lose;
}

// Generates n unique tuples with values in range [0,max)
export const generateUniqueTuples = (n, max) => {
    if(n > max * max || n <= 0) return []; //Cannot generate more then max*max unique tuples, or negative amount

    const map = new Map();
    const tuples = [];
    
    while(tuples.length < n) {
        let x, y;
        do {
            x = Math.floor(Math.random() * max);
            y = Math.floor(Math.random() * max);
            if(!map.has(`(${x},${y})`)) {
                map.set(`(${x},${y})`, true);
                tuples.push({ x, y });
            }
        } while(!map.has(`(${x},${y})`))
    }

    //Sort by x first, then y
    tuples.sort((a, b) => {
        if(a.x === b.x) {
            return (a.y > b.y) ? -1 : 1;
        }
        return (a.x > b.x) ? -1 : 1;
    });

    return tuples;
}