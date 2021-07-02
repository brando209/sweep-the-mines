import { render, screen, fireEvent } from '@testing-library/react';
import Select from './Select';

test('renders with correct label', () => {
    render(
        <Select name="test" label="Test" />
    );
    expect(screen.getByRole('combobox')).toBeInTheDocument();
    expect(screen.getByText('Test')).toBeInTheDocument();
});

test('renders with correct options', () => {
    render(
        <Select name="test" label="Test">
            <option value="test1">1</option>
            <option value="test2">2</option>
            <option value="test3">3</option>
        </Select>
    );
    const [opt1, opt2, opt3] = screen.getAllByRole('option');
    expect(opt1).toHaveValue('test1');
    expect(opt2).toHaveValue('test2');
    expect(opt3).toHaveValue('test3');
});

test('onSelect handler called once per option change', () => {
    const handleSelect = jest.fn();
    render(
        <Select name="test" label="Test" onSelect={handleSelect}>
            <option value="test1">1</option>
            <option value="test2">2</option>
            <option value="test3">3</option>
        </Select>
    );
    const select = screen.getByRole('combobox');

    fireEvent.change(select, { target: { value: 'test1' }});
    expect(handleSelect).toBeCalledTimes(1);

    fireEvent.change(select, { target: { value: 'test2' }});
    expect(handleSelect).toBeCalledTimes(2);

    fireEvent.change(select, { target: { value: 'test3' }});
    expect(handleSelect).toBeCalledTimes(3);

    fireEvent.change(select, { target: { value: 'test2' }});
    expect(handleSelect).toBeCalledTimes(4);
});

test('When option is selected, return that options value', () => {
    let passedOptionValue = "";
    const handleSelect = (value) => {
        passedOptionValue = value;
    }

    render(
        <Select name="test" label="Test" onSelect={handleSelect}>
            <option value="test1">1</option>
            <option value="test2">2</option>
            <option value="test3">3</option>
        </Select>
    );
    const select = screen.getByRole('combobox');

    fireEvent.change(select, { target: { value: 'test1' }});
    expect(passedOptionValue).toBe('test1');

    fireEvent.change(select, { target: { value: 'test2' }});
    expect(passedOptionValue).toBe('test2');

    fireEvent.change(select, { target: { value: 'test3' }});
    expect(passedOptionValue).toBe('test3');
});