import { render, screen } from "@testing-library/react";
import Home from './index';

describe('Tests in the home page', () => {

    it('Check if the footer component has been rendered', () => {
        render(<Home />);

        expect(screen.getByText('GENERATE CHART')).toBeInTheDocument();
    });

    it('Check if the input component has been rendered', () => {
        render(<Home />);

        expect(screen.getByTestId('input')).toBeInTheDocument();
    });

    it('Check if the Header component has been rendered', () => {
        render(<Home />);

        expect(screen.getByText("Daniel's Challenge")).toBeInTheDocument();
    });
});