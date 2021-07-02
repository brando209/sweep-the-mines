import { render, screen, fireEvent } from '@testing-library/react';
import Grid from './Grid';

import { DIFFICULTY } from '../../utility/grid/grid';

test('renders easy grid', () => {
    render(<Grid gridDifficulty={DIFFICULTY.EASY} />);

    const gridRowElements = screen.getAllByTestId('grid-row-element');
    expect(gridRowElements).toHaveLength(10);
    expect(gridRowElements[0].childElementCount).toBe(10);
});

test('renders medium grid', () => {
    render(<Grid gridDifficulty={DIFFICULTY.MEDIUM} />);

    const gridRowElements = screen.getAllByTestId('grid-row-element');
    expect(gridRowElements).toHaveLength(15);
    expect(gridRowElements[0].childElementCount).toBe(15);
});

test('renders hard grid', () => {
    render(<Grid gridDifficulty={DIFFICULTY.HARD} />);
    
    const gridRowElements = screen.getAllByTestId('grid-row-element');
    expect(gridRowElements).toHaveLength(20);
    expect(gridRowElements[0].childElementCount).toBe(20);
});

test('left click on "unselected" grid cell causes cell to be "selected"', () => {
    render(<Grid gridDifficulty={DIFFICULTY.EASY} />);

    const gridRowElements = screen.getAllByTestId('grid-row-element');
    const gridCell = gridRowElements[0].childNodes[0];
    expect(gridCell).toHaveClass('unselected');
    fireEvent.click(gridCell);
    expect(gridCell).toHaveClass('selected');
});

test('right click on "unselected" grid cell causes cell to be "flagged"', () => {
    render(<Grid gridDifficulty={DIFFICULTY.EASY} />);

    const gridRowElements = screen.getAllByTestId('grid-row-element');
    const gridCell = gridRowElements[0].childNodes[0];
    expect(gridCell).toHaveClass('unselected');
    fireEvent.contextMenu(gridCell);
    expect(gridCell).toHaveClass('flagged');
});

test('right click on "flagged" grid cell causes cell to be "unselected"', () => {
    render(<Grid gridDifficulty={DIFFICULTY.EASY} />);

    const gridRowElements = screen.getAllByTestId('grid-row-element');
    const gridCell = gridRowElements[0].childNodes[0];
    expect(gridCell).toHaveClass('unselected');
    fireEvent.contextMenu(gridCell);
    expect(gridCell).toHaveClass('flagged');
    fireEvent.contextMenu(gridCell);
    expect(gridCell).toHaveClass('unselected');
});

test('left click on "flagged" grid cell causes cell to be "selected"', () => {
    render(<Grid gridDifficulty={DIFFICULTY.EASY} />);

    const gridRowElements = screen.getAllByTestId('grid-row-element');
    const gridCell = gridRowElements[0].childNodes[0];
    expect(gridCell).toHaveClass('unselected');
    fireEvent.contextMenu(gridCell);
    expect(gridCell).toHaveClass('flagged');
    fireEvent.click(gridCell);
    expect(gridCell).toHaveClass('selected');
});