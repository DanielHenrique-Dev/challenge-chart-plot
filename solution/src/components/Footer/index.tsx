import React from 'react';
import { DivFooter, BtnGerar } from './styles';

interface IFooter {
    clickEvent: Function
}

const Footer: React.FC<IFooter> = (props: IFooter) => {
    const { clickEvent } = props;

    return (
        <DivFooter>
            <BtnGerar data-testid='generate' onClick={(e) => clickEvent(e)}>GENERATE CHART</BtnGerar>
        </DivFooter>
    )
}

export default Footer;