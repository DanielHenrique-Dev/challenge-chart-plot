import React from 'react';
import { Chart } from "react-google-charts";

interface Iprops {
    data: string
}

interface IstartObject {
    timestamp: number,
    select: Array<string>,
    group: Array<string>
}

interface IstopObject {
    timestamp: number
}

interface IspanObject {
    timestamp: number,
    begin: number,
    end: number,
}

interface IspanObject {
    timestamp: number,
    begin: number,
    end: number,
}

interface IdataArray {
    timestamp: number, 
    os: string, 
    browser: string, 
    min_response_time: number, 
    max_response_time: number
}

const Graphic: React.FC<Iprops> = (props: Iprops) => {
    const { data } = props;
    //const teste = ChartLogic(data);
    //console.log(teste);

    const validData = (data: string) => {

        if(data !== ''){

        } else {
            return '';
        }
    }

    return (
            <Chart
                chartType="LineChart"
                data={[["Age", "Weight"], [4, 5.5], [8, 12]]}
                width="100%"
                height="400px"
                legendToggle
            /> 
    )
}

const ChartLogic = (data: string): any => {
    var arrayData = data.trim().split('\n');
  
    var startObject: IstartObject = {timestamp: 0,  select: [], group: []};
    var stopObject: IstopObject = {timestamp: 0};
    var spanObject: IspanObject = {timestamp: 0, begin: 0, end: 0};
    var dataArray: Array<IdataArray> = [{timestamp: 0, os: '', browser: '', min_response_time: 0, max_response_time: 0}];
  
    for (let i = 0; i < arrayData.length; i++) {
      var itemData = eval('(' + arrayData[i] + ')');
  
      if ('type' in itemData && 'timestamp' in itemData) {
        if (itemData.type === 'start') {
          startObject = {
            timestamp: itemData.timestamp,
            select: itemData.select,
            group: itemData.group,
          };
        } else if (itemData.type === 'stop') {
          stopObject = { timestamp: itemData.timestamp };

        } else if (itemData.type === 'span') {
          spanObject = {
            timestamp: itemData.timestamp,
            begin: itemData.begin,
            end: itemData.end,
          };

        } else if (itemData.type === 'data') {

          dataArray.push({
            timestamp: itemData.timestamp,
            os: itemData.os,
            browser: itemData.browser,
            min_response_time: itemData.min_response_time,
            max_response_time: itemData.max_response_time,
          });

        }
      }
    }
  
    var arrayLabels: Array<string> = [];
    var arrayValues: Array<any> = [];
  
    for (var j = 0; j < dataArray.length; j++) {
      if (
        dataArray[j].timestamp > startObject.timestamp &&
        dataArray[j].timestamp < stopObject.timestamp
      ) {
        if (
          spanObject.begin < dataArray[j].timestamp &&
          spanObject.end > dataArray[j].timestamp
        ) {
          arrayLabels.push(`${dataArray[j].os} ${dataArray[j].browser}`);
          arrayValues.push([
            dataArray[j].min_response_time,
            dataArray[j].max_response_time,
          ]);
        } 
      }
    } 

    return '';
}

export default Graphic;