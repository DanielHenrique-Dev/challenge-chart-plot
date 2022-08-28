import React, { useEffect, useState } from 'react';

import Footer from '../../components/Footer';
import Graphic from '../../components/Graphic';
import Header from '../../components/Header';
import Input from '../../components/Input';
import { ChartDiv, Container, Main } from './styles';

const Home: React.FC = () => {

    const [data, setData] = useState<string>('');

    const [submittedData, setSubmittedData] = useState<string>('');

    const [clickEvent, setclickEvent] = useState<boolean>(false);

    const getInputValue = (value: string) => {

        if(value !== ''){
            setData(value);
        }
    }

    const getClickEvent = (click: boolean) => {
        setclickEvent(click);
    };

    useEffect(() => {
        setSubmittedData(data);

    },[clickEvent]);

    return (
        <Container>
            <Header/>
            
            <Main>
                <Input getInput={getInputValue}/>

                <ChartDiv>
                    <Graphic data={submittedData}/>                   
                </ChartDiv>
            </Main>

            <Footer clickEvent={getClickEvent}/>
        </Container>
    )
}

export default Home;
