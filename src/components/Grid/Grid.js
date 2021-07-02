import React, { useEffect, useMemo, useState } from 'react';

import Cell from '../Cell/Cell';
import { generateInitialGrid, getUpdatedCellValue } from '../../utility/grid/grid';
import './Grid.css';

export default function Grid({ gridDifficulty }) {
    const [grid, setGrid] = useState(generateInitialGrid(gridDifficulty));
   
    useMemo(() => {
    //     console.log("Grid set to:", grid);
    }, [])//[grid])

    useEffect(() => {
        setGrid(generateInitialGrid(gridDifficulty));
    }, [gridDifficulty])

    const handleCellClick = (type, rowIdx, colIdx) => {
        setGrid(prevGrid => {
            return prevGrid.map((row, i) => {
                if(i !== rowIdx) return row;
                else return row.map((cell, j) =>
                    (j === colIdx) ? { value: getUpdatedCellValue(type === 'right', cell), isBomb: cell.isBomb } : cell
                )
            });
        });
    }

    return (
        <div className="grid">
            {grid.map((row, i) => (
                <div 
                    className="grid-row" 
                    key={`grid-row-${i}`}
                    data-testid="grid-row-element"
                >
                    {row.map((cell, j) => (
                        <Cell 
                            key={`cell-${i}-${j}`} 
                            value={cell.value}
                            onClick={(type) => handleCellClick(type, i, j)} 
                        />
                    ))}
                </div>
            ))}
        </div>
    )
}