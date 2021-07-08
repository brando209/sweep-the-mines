import { 
    getGridSize, 
    generateInitialGrid, 
    generateUniqueTuples, 
    countNeighboringBombs, 
    getNeighborIndices,
    toggleFlag,
    checkLose,
    checkWin,
    DIFFICULTY 
} from './grid';

expect.extend({
    toContainOnly(received, argument) {
        let pass = true;
        for(let key in argument) {
            for(let item of received) {
                if(item[key] !== argument[key]) {
                    pass = false;
                    break;
                }
            }
        }

        return {
            message: () => `Expected ${this.utils.printReceived(received)} to contain only ${this.utils.printExpected(argument)}`,
            pass: pass
        }
    }
});

test('getGridSize(difficulty) returns correct grid size for each grid difficulty', () => {
    expect(getGridSize(DIFFICULTY.EASY)).toBe(10);
    expect(getGridSize(DIFFICULTY.MEDIUM)).toBe(15);
    expect(getGridSize(DIFFICULTY.HARD)).toBe(20);
});

test('generateInitialGrid(size) returns correct 2D-array based on passed difficulty', () => {
    const easyGridArray = generateInitialGrid(DIFFICULTY.EASY);
    expect(easyGridArray).toHaveLength(10);
    expect(easyGridArray[0]).toHaveLength(10);
    expect(easyGridArray[0]).toContainOnly({ value: "unselected" });

    const mediumGridArray = generateInitialGrid(DIFFICULTY.MEDIUM);
    expect(mediumGridArray).toHaveLength(15);
    expect(mediumGridArray[0]).toHaveLength(15);
    expect(mediumGridArray[0]).toContainOnly({ value: "unselected" });

    const hardGridArray = generateInitialGrid(DIFFICULTY.HARD);
    expect(hardGridArray).toHaveLength(20);
    expect(hardGridArray[0]).toHaveLength(20);
    expect(hardGridArray[0]).toContainOnly({ value: "unselected" });
});

describe('generateUniqueTuples(n, max) utility', () => {
    test('generates correct amount of tuples', () => {
        let tuples = generateUniqueTuples(5, 5);
        expect(tuples).toHaveLength(5);
        
        tuples = generateUniqueTuples(10, 5);
        expect(tuples).toHaveLength(10);

        tuples = generateUniqueTuples(6, 10);
        expect(tuples).toHaveLength(6);

        tuples = generateUniqueTuples(2, 3);
        expect(tuples).toHaveLength(2);

        tuples = generateUniqueTuples(20, 10);
        expect(tuples).toHaveLength(20);

        tuples = generateUniqueTuples(34, 10);
        expect(tuples).toHaveLength(34);
    });

    test('all tuples generated are unique', () => {
        const checkUnique = (tuples) => {
            while(tuples.length > 0) {
                const current = tuples.pop();
                expect(tuples).not.toContainEqual(current);
            }
        }

        checkUnique(generateUniqueTuples(5, 5));
        checkUnique(generateUniqueTuples(10, 10));
        checkUnique(generateUniqueTuples(5, 10));
        checkUnique(generateUniqueTuples(25, 5));
    });

    test('returns empty array when number of tuples cannot be unique', () => {
        let tuples = generateUniqueTuples(100, 5);
        expect(tuples).toHaveLength(0);

        tuples = generateUniqueTuples(20, 4);
        expect(tuples).toHaveLength(0);

        tuples = generateUniqueTuples(101, 10);
        expect(tuples).toHaveLength(0);
    });

});

describe('countNeighboringBombs(grid, rowIdx, colIdx) utility', () => {
    test('counts 0 neighboring bombs', () => {
        const grid = [
            new Array(3).fill({ value: 'unselected', isBomb: false }),
            new Array(3).fill({ value: 'unselected', isBomb: false }),
            new Array(3).fill({ value: 'unselected', isBomb: false }),
        ];
        expect(countNeighboringBombs(grid, 1, 1)).toBe(0);
    });

    test('counts 1 neighboring bombs', () => {
        const grid = [
            [{ value: 'unselected', isBomb: false }, { value: 'unselected', isBomb: true }, { value: 'unselected', isBomb: false }],
            new Array(3).fill({ value: 'unselected', isBomb: false }),
            new Array(3).fill({ value: 'unselected', isBomb: false }),
        ];
        expect(countNeighboringBombs(grid, 1, 1)).toBe(1);
    });

    test('counts 2 neighboring bombs', () => {
        const grid = [
            [{ value: 'unselected', isBomb: true }, { value: 'unselected', isBomb: false }, { value: 'unselected', isBomb: false }],
            new Array(3).fill({ value: 'unselected', isBomb: false }),
            [{ value: 'unselected', isBomb: false }, { value: 'unselected', isBomb: false }, { value: 'unselected', isBomb: true }],
        ];
        expect(countNeighboringBombs(grid, 1, 1)).toBe(2);
    });

    test('counts 3 neighboring bombs', () => {
        const grid = [
            [{ value: 'unselected', isBomb: true }, { value: 'unselected', isBomb: false }, { value: 'unselected', isBomb: true }],
            new Array(3).fill({ value: 'unselected', isBomb: false }),
            [{ value: 'unselected', isBomb: true }, { value: 'unselected', isBomb: false }, { value: 'unselected', isBomb: false }],
        ];
        expect(countNeighboringBombs(grid, 1, 1)).toBe(3);
    });

    test('counts 4 neighboring bombs', () => {
        const grid = [
            [{ value: 'unselected', isBomb: true }, { value: 'unselected', isBomb: false }, { value: 'unselected', isBomb: true }],
            new Array(3).fill({ value: 'unselected', isBomb: false }),
            [{ value: 'unselected', isBomb: true }, { value: 'unselected', isBomb: false }, { value: 'unselected', isBomb: true }],
        ];
        expect(countNeighboringBombs(grid, 1, 1)).toBe(4);
    });

    test('counts 5 neighboring bombs', () => {
        const grid = [
            [{ value: 'unselected', isBomb: true }, { value: 'unselected', isBomb: true }, { value: 'unselected', isBomb: true }],
            new Array(3).fill({ value: 'unselected', isBomb: false }),
            [{ value: 'unselected', isBomb: true }, { value: 'unselected', isBomb: false }, { value: 'unselected', isBomb: true }],
        ];
        expect(countNeighboringBombs(grid, 1, 1)).toBe(5);
    });

    test('counts 6 neighboring bombs', () => {
        const grid = [
            [{ value: 'unselected', isBomb: true }, { value: 'unselected', isBomb: true }, { value: 'unselected', isBomb: true }],
            new Array(3).fill({ value: 'unselected', isBomb: false }),
            [{ value: 'unselected', isBomb: true }, { value: 'unselected', isBomb: true }, { value: 'unselected', isBomb: true }],
        ];
        expect(countNeighboringBombs(grid, 1, 1)).toBe(6);
    });

    test('counts 7 neighboring bombs', () => {
        const grid = [
            [{ value: 'unselected', isBomb: true }, { value: 'unselected', isBomb: true }, { value: 'unselected', isBomb: true }],
            [{ value: 'unselected', isBomb: true }, { value: 'unselected', isBomb: false }, { value: 'unselected', isBomb: false }],
            [{ value: 'unselected', isBomb: true }, { value: 'unselected', isBomb: true }, { value: 'unselected', isBomb: true }],
        ];
        expect(countNeighboringBombs(grid, 1, 1)).toBe(7);
    });

    test('counts 8 neighboring bombs', () => {
        const grid = [
            [{ value: 'unselected', isBomb: true }, { value: 'unselected', isBomb: true }, { value: 'unselected', isBomb: true }],
            [{ value: 'unselected', isBomb: true }, { value: 'unselected', isBomb: false }, { value: 'unselected', isBomb: true }],
            [{ value: 'unselected', isBomb: true }, { value: 'unselected', isBomb: true }, { value: 'unselected', isBomb: true }],
        ];
        expect(countNeighboringBombs(grid, 1, 1)).toBe(8);
    });
});

describe('getNeighborIndices(grid, rowIdx, colIdx) utility', () => {
    test('returns correct neighbor indices for a cell with eight neighbors', () => {
        const neighborIndices = getNeighborIndices(3, 1, 1);
        expect(neighborIndices).toHaveLength(8);
        expect(neighborIndices).toContainEqual([0, 0]);
        expect(neighborIndices).toContainEqual([1, 0]);
        expect(neighborIndices).toContainEqual([2, 0]);
        expect(neighborIndices).toContainEqual([0, 1]);
        expect(neighborIndices).toContainEqual([2, 1]);
        expect(neighborIndices).toContainEqual([0, 2]);
        expect(neighborIndices).toContainEqual([1, 2]);
        expect(neighborIndices).toContainEqual([2, 2]);
    });

    test('returns correct neighbor indices for a cell with five neighbors', () => {
        const neighborIndices = getNeighborIndices(3, 0, 1);
        expect(neighborIndices).toHaveLength(5);
        expect(neighborIndices).toContainEqual([0, 0]);
        expect(neighborIndices).toContainEqual([1, 0]);
        expect(neighborIndices).toContainEqual([1, 1]);
        expect(neighborIndices).toContainEqual([0, 2]);
        expect(neighborIndices).toContainEqual([1, 2]);

    });

    test('returns correct neighbor indices for a cell with three neighbors', () => {
        const neighborIndices = getNeighborIndices(3, 0, 0);
        expect(neighborIndices).toHaveLength(3);
        expect(neighborIndices).toContainEqual([1, 0]);
        expect(neighborIndices).toContainEqual([0, 1]);
        expect(neighborIndices).toContainEqual([1, 1]);
    });
});

describe('toggleFlag(grid, rowIdx, colIdx) utility', () => {
    const grid = [
        new Array(5).fill({ value: 'unselected', isBomb: false }),
        new Array(5).fill({ value: 'unselected', isBomb: false }),
        new Array(5).fill({ value: 'unselected', isBomb: false }),
        new Array(5).fill({ value: 'flagged', isBomb: false }),
        new Array(5).fill({ value: 'unselected', isBomb: false }),
    ]

    test('changes cell(rowIdx, colIdx) from "unselected" to "flagged"', () => {
        const cell = grid[2][3];
        expect(cell.value).toBe('unselected');
        const newGrid = toggleFlag(grid, 2, 3);
        expect(newGrid[2][3].value).toBe('flagged');
    });

    test('changes cell(rowIdx, colIdx) from "flagged" to "unselected"', () => {
        const cell = grid[3][4];
        expect(cell.value).toBe('flagged');
        const newGrid = toggleFlag(grid, 3, 4);
        expect(newGrid[3][4].value).toBe('unselected');
    });
});

describe('checkWin(grid) and checkLose(grid) utilities', () => {
    const winningGrid = [
        new Array(3).fill({ value: "selected", isBomb: false }),
        new Array(3).fill({ value: "selected", isBomb: false }),
        new Array(3).fill({ value: "selected", isBomb: false }),
    ]
    const losingGrid = [
        new Array(3).fill({ value: "selected", isBomb: false }),
        [{ value: "selected bombed", isBomb: true }, { value: "unselected", isBomb: false }, { value: "unselected", isBomb: false }],
        new Array(3).fill({ value: "selected", isBomb: false }),
    ]

    expect(checkWin(winningGrid)).toBeTruthy();
    expect(checkWin(losingGrid)).toBeFalsy();
    expect(checkLose(winningGrid)).toBeFalsy();
    expect(checkLose(losingGrid)).toBeTruthy();
});
