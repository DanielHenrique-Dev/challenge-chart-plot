import { fireEvent, render, screen } from '@testing-library/react';
import Graphic from './index';

describe('Tests in the graphic component', () => {

    it('Checking for empty data validation', () => {
        const data = '';

        render(<Graphic data={data}/>);

        expect(screen.getByText('Enter data for the graph to be rendered')).toBeInTheDocument();
    });

    it('Checking for error validation when formatting data', () => {
        const data = 'Simple texts, typed by the user';

        render(<Graphic data={data}/>);

        expect(screen.getByText('Error processing entered data.')).toBeInTheDocument();
    });
});