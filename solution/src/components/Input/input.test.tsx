import { fireEvent, render, screen } from '@testing-library/react';
import Input from './index';

describe('Tests in the Input component', () => {

    it('Check if the component has been rendered', () => {
        const getInput = jest.fn();

        render(<Input getInput={getInput}/>);

        expect(screen.getByTestId('input')).toBeInTheDocument();
    });
});