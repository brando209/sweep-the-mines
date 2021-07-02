import React from 'react';
import './Cell.css';

export default function Cell({ value, onClick, ...props }) {
    const handleLeftClick = () => {
        onClick('left');
    }

    const handleRightClick = (e) => {
        e.preventDefault();
        onClick('right');
    }

    return (
        <div 
            className={`cell ${value}`} 
            onClick={handleLeftClick} 
            onContextMenu={handleRightClick} 
            data-testid="cell-element"
            { ...props } 
        />
    )
}