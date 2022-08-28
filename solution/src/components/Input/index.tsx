import React, { useEffect, useState } from 'react';
import CodeMirror from '@uiw/react-codemirror';
import { javascript } from '@codemirror/lang-javascript';
import {darcula} from '@uiw/codemirror-theme-darcula';

interface  IProps {
    getInput: Function;
}

const Input: React.FC<IProps> = ({getInput}) => {

    const [value, setValue] = useState<string>('');

    useEffect(() => {        
        getInput(value);

    }, [value]);

    const FilterValue = (valueInput: string) => {
        if(valueInput != undefined) {
          setValue(valueInput.trim())  
        }
    } 

    return (
        <CodeMirror
            value=""
            height="200px"
            theme={darcula}
            extensions={[javascript({ jsx: true })]}
            onChange={FilterValue}
            data-testid="input"
        />
    );
}

export default Input;

