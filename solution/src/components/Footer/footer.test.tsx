import { fireEvent, render, screen } from '@testing-library/react';
import Footer from './index';

describe('Tests in the footer component', () => {

    it('Check if the button has been rendered', () => {
        const getClickEvent = jest.fn();

        render(<Footer clickEvent={getClickEvent} />);

        expect(screen.getByText("GENERATE CHART")).toBeInTheDocument();
    });

    it('Check if the Button is calling the function from home', () => {
        const getClickEvent = jest.fn();

        render(<Footer clickEvent={getClickEvent} />);

        fireEvent.click(screen.getByText("GENERATE CHART"));

        expect(getClickEvent).toBeCalled();
    });
});
