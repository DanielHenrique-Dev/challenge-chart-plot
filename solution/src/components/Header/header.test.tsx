import { render, screen } from '@testing-library/react';
import Header from './index';

describe('Tests in the Header component', () => {

    it('Check if the button has been rendered', () => {

        render(<Header />);

        expect(screen.getByText("Daniel's Challenge")).toBeInTheDocument();
    });
});