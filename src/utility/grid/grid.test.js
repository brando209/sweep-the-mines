import { getGridSize, generateInitialGrid, generateUniqueTuples, getUpdatedCellValue, DIFFICULTY } from './grid';

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

describe('getUpdatedCellValue(rightClick, currentCell) utility', () => {
    // [expectedResult, firstArg, secondArg]
    const cases = [
        ['selected', false, { value: 'unselected' }],
        ['flagged', true, { value: 'unselected' }],
        ['selected', false, { value: 'selected' }],
        ['selected', true, { value: 'selected' }],
        ['selected', false, { value: 'flagged' }],
        ['unselected', true, { value: 'flagged' }],
    ];

    test.each(cases)(
        "getUpdatedCellValue(rightClick, currentCell) should return %p when given %p and %p as arguments",
        (expectedResult, firstArg, secondArg) => {
            const result = getUpdatedCellValue(firstArg, secondArg);
            expect(result).toBe(expectedResult);
        }
    )
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
    })

    test('returns empty array when number of tuples cannot be unique', () => {
        let tuples = generateUniqueTuples(100, 5);
        expect(tuples).toHaveLength(0);

        tuples = generateUniqueTuples(20, 4);
        expect(tuples).toHaveLength(0);

        tuples = generateUniqueTuples(101, 10);
        expect(tuples).toHaveLength(0);
    })

});