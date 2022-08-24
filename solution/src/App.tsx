import * as React from 'react';

import Home from './pages/Home';
import GlobalStyles from './styles/GlobalStyles';

const App: React.FC = () => {
    return (
        <>
            <GlobalStyles />
            <Home />
        </>
    );
}

export default App;