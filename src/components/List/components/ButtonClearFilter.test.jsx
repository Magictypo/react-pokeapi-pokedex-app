import React from 'react';
import { render } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import ButtonClearFilter from './ButtonClearFilter';

describe('button ButtonClearFilter working correctly', () => {
  test('renders ButtonClearFilter enabled', () => {
    const mockCallBack = jest.fn();
    const disabled = false;
    const { getByText } = render(<ButtonClearFilter onClick={mockCallBack} disabled={disabled} />);
    const button = getByText(/Clear Filter/i).closest('button');
    expect(button).toBeEnabled();
  });

  test('renders ButtonClearFilter disabled', () => {
    const mockCallBack = jest.fn();
    const disabled = true;
    const { getByText } = render(<ButtonClearFilter onClick={mockCallBack} disabled={disabled} />);
    const button = getByText(/Clear Filter/i).closest('button');
    expect(button).toBeDisabled();
  });

  test('renders ButtonClearFilter click', () => {
    const mockCallBack = jest.fn();
    const disabled = false;
    const { getByText } = render(<ButtonClearFilter onClick={mockCallBack} disabled={disabled} />);
    const button = getByText(/Clear Filter/i).closest('button');

    userEvent.click(button);
    expect(mockCallBack).toBeCalled();
  });

  test('renders ButtonClearFilter disabled, callback not called', () => {
    const mockCallBack = jest.fn();
    const disabled = true;
    const { getByText } = render(<ButtonClearFilter onClick={mockCallBack} disabled={disabled} />);
    const button = getByText(/Clear Filter/i).closest('button');

    userEvent.click(button);
    expect(mockCallBack).toBeCalledTimes(0);
  });
});
