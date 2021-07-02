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

export const getTotalBombCount = (difficulty) => {
    if(difficulty === DIFFICULTY.EASY) return 20;
    if(difficulty === DIFFICULTY.MEDIUM) return 40;
    if(difficulty === DIFFICULTY.HARD) return 60;
}

export const getGridSize = (difficulty) => {
    if (difficulty === "hard") return 20;
    if (difficulty === "medium") return 15;
    return 10;
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

export const getUpdatedCellValue = (rightClick, currentCell) => {
    if(rightClick) {
        if(currentCell.value === GRID_VALUE.UNSELECTED) return GRID_VALUE.FLAGGED;
        if(currentCell.value === GRID_VALUE.FLAGGED) return GRID_VALUE.UNSELECTED;
    }
    return GRID_VALUE.SELECTED + (currentCell.isBomb ? " " + GRID_VALUE.BOMBED : "");
}

// Generates n unique tuples with values in range [0,max)
export const generateUniqueTuples = (n, max) => {
    if(n > max * max) return []; //Cannot generate more then max*max unique tuples

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