import React, { useEffect, useState } from 'react';

import Cell from '../Cell/Cell';
import { generateInitialGrid, updateGrid, toggleFlag, checkWin, checkLose, GRID_VALUE } from '../../utility/grid/grid';
import './Grid.css';


export default function Grid({ gridDifficulty, resetToggle, onGameOver }) {
    const [grid, setGrid] = useState(generateInitialGrid(gridDifficulty));
    const [end, setEnd] = useState(false);
    
    useEffect(() => {
        if(checkWin(grid)) onGameOver(true);
        if(checkLose(grid)) {
            setEnd(true);
            onGameOver(false);
        }
    }, [grid, onGameOver]);

    useEffect(() => {
        end && exposeBombs();
    }, [end]);

    useEffect(() => {
        setGrid(generateInitialGrid(gridDifficulty));
        setEnd(false);
    }, [gridDifficulty, resetToggle]);

    function exposeBombs() {
        setGrid(prevGrid => {
            return prevGrid.map(row => (
                row.map(cell => {
                    if(cell.isBomb) return { ...cell, value: GRID_VALUE.BOMBED, display: "!!"};
                    else return cell;
                })
            ))
        })
    }

    const handleCellClick = (type, rowIdx, colIdx) => {
        setGrid(prevGrid => {
            if(type === "right"){
                return toggleFlag([...prevGrid], rowIdx, colIdx);
            }
            return updateGrid([...prevGrid], rowIdx, colIdx);
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
                            display={cell.display}
                            onClick={(type) => handleCellClick(type, i, j)} 
                        />
                    ))}
                </div>
            ))}
        </div>
    )
}