import React, { useEffect, useState } from 'react';
import Footer from '../../components/Footer';
import Graphic from '../../components/Graphic';
import Header from '../../components/Header';
import Input from '../../components/Input';
import { ChartDiv, Container, Main } from './styles';

const Home: React.FC = () => {

    const [data, setData] = useState<string>('');

    const getInputValue = (value: string) => {

        if(value !== ''){
            setData(value);
        }
    }

    useEffect(() => {


    },[data]);

    return (
        <Container>
            <Header/>
            
            <Main>
                <Input getInput={getInputValue}/>

                <ChartDiv>
                    <Graphic data={data}/>                   
                </ChartDiv>
            </Main>

            <Footer />
        </Container>
    )
}

export default Home;
