import { fireEvent, render, screen, cleanup } from '@testing-library/react';
import Cell from './Cell';

afterEach(cleanup);

test('renders unselected cell', () => {
    render(<Cell value="unselected" />);
    const cellElement = screen.getByTestId('cell-element');
    expect(cellElement).toBeInTheDocument();
    expect(cellElement).toHaveClass('unselected');
});

test('renders selected cell', () => {
    render(<Cell value="selected" />);
    const cellElement = screen.getByTestId('cell-element');
    expect(cellElement).toBeInTheDocument();
    expect(cellElement).toHaveClass('selected');
});

test('renders flagged cell', () => {
    render(<Cell value="flagged" />);
    const cellElement = screen.getByTestId('cell-element');
    expect(cellElement).toBeInTheDocument();
    expect(cellElement).toHaveClass('flagged');
});

test('When cell is clicked with left mouse button, return "left"', () => {
    let passedClickType = '';
    const handleOnCellClick = (clickType) => {
        passedClickType = clickType;
    };

    render(<Cell onClick={handleOnCellClick} />);
    const cellElement = screen.getByTestId('cell-element');

    cellElement.click();
    expect(passedClickType).toBe('left');
});

test('When cell is clicked with right mouse button, return "right"', () => {
    let passedClickType = '';
    const handleOnCellClick = (clickType) => {
        passedClickType = clickType;
    };

    render(<Cell onClick={handleOnCellClick} />);
    const cellElement = screen.getByTestId('cell-element');

    fireEvent.contextMenu(cellElement);
    expect(passedClickType).toBe('right');
});