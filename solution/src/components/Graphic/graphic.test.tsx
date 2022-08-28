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

    it('Check for missing parameters in the entered data.', () => {
        
        const data = `{type: 'start', timestamp: 1519862400000, select: ['min_response_time', 'max_response_time'], group: ['os', 'browser']} 
                        {type: 'span', timestamp: 1519862400000, begin: 1519862400000, end: 1519862460000}
                        {type: 'data', timestamp: 1519862400000, os: 'linux', browser: 'chrome', min_response_time: 0.1, max_response_time: 1.3}
                        {type: 'data', timestamp: 1519862400000, os: 'mac', browser: 'chrome', min_response_time: 0.2, max_response_time: 1.2}
                        {type: 'data', timestamp: 1519862400000, os: 'mac', browser: 'firefox', min_response_time: 0.3, max_response_time: 1.2}
                        {type: 'data', timestamp: 1519862400000, os: 'linux', browser: 'firefox', min_response_time: 0.1, max_response_time: 1.0}
                        {type: 'data', timestamp: 1519862460000, os: 'linux', browser: 'chrome', min_response_time: 0.2, max_response_time: 0.9}
                        {type: 'data', timestamp: 1519862460000, os: 'mac', browser: 'chrome', min_response_time: 0.1, max_response_time: 1.0}
                        {type: 'data', timestamp: 1519862460000, os: 'mac', browser: 'firefox', min_response_time: 0.2, max_response_time: 1.1}
                        {type: 'data', timestamp: 1519862460000, os: 'linux', browser: 'firefox', min_response_time: 0.3, max_response_time: 1.4}
                        {, timestamp: 1519862460000}`;

        render(<Graphic data={data}/>);

        expect(screen.getByText('Error processing entered data.')).toBeInTheDocument();
    });
});