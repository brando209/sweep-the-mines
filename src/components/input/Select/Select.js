import React from 'react';

export default function Select({ name, label, children, onSelect }) {
    return (
        <div className='select-container'>
            <label htmlFor={name}>{label}</label>
            <select name={name} onChange={(e) => onSelect(e.target.value)}>
                {children}
            </select>
        </div>
    )
}