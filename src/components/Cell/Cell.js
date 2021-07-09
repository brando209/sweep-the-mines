import React from 'react';
import './Cell.css';

export default function Cell({ value, display = "", onClick, ...props }) {
    const handleLeftClick = () => {
        onClick('left');
    }

    const handleRightClick = (e) => {
        e.preventDefault();
        onClick('right');
    }

    let displayComponent = null;
    if(typeof display === "string" || typeof display === "number") {
        displayComponent = display;
    } else {
        displayComponent = <img src={display.src} alt="" />
    }

    return (
        <div 
            className={`cell ${value}`} 
            onClick={handleLeftClick} 
            onContextMenu={handleRightClick} 
            data-testid="cell-element"
            { ...props } 
        >
            {displayComponent}
        </div>
    )
}