import React from 'react';

export default function Select({ name, label, children, onSelect, ...props }) {
    return (
        <div {...props}>
            <label htmlFor={name}>{label}</label>
            <select name={name} onChange={(e) => onSelect(e.target.value)}>
                {children}
            </select>
        </div>
    )
}