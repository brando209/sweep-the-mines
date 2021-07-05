import React from 'react';
import './Overlay.css';

export default function Overlay(props) {
    return (
        <div className={`overlay${props.active ? " active" : ""}`}>
            <div className="overlay-render">
                {props.render && props.render()}
            </div>
            <div className="overlay-children">
                {props.children}
            </div>
        </div>
    );
}