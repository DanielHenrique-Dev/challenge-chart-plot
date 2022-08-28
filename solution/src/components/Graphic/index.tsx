import React, { Component, useEffect, useState } from 'react';
import { Chart } from "react-google-charts";
import { DataNotFound, ErrorInProcessing } from './styles';

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

interface IprocessedData {
  status: string,
  data: Array<any>
}

interface IControllArray {
  timestamp: number,
  header_name: string,
  max_response: number,
  min_response: number
}

const Graphic: React.FC<Iprops> = (props: Iprops) => {
    const { data } = props;
    
    const [result, setResult] = useState<JSX.Element>();

    const validData = (data: string) => {

        if(data !== ''){
          const processedData: IprocessedData = ChartLogic(data);

          console.log(processedData);

          if(processedData.status === 'error') {
            return <ErrorInProcessing>Error processing entered data.</ErrorInProcessing>
          }  

          const options = {
            vAxis: { textPosition: 'none' },
            hAxis: { gridlines: { color: 'transparent' }, format: 'mm:ss' },
            pointsVisible: true,
            interpolateNulls: true
          };

          return (
                  <Chart
                      chartType="LineChart"
                      width="100%"
                      height="400px"
                      data={processedData.data}
                      options={options}
                  />
          )

        } else {
            return <DataNotFound>Enter data for the graph to be rendered</DataNotFound>;
        }
    }

    useEffect(() => {

      let validatedData: JSX.Element = validData(data);
      setResult(validatedData);

    }, [data]);

    return ( <>{result}</> )
}

const ChartLogic = (data: string): any => {
    var arrayData = data.trim().split('\n');
  
    var startObject: IstartObject = {timestamp: 0,  select: [], group: []};
    var stopObject: IstopObject = {timestamp: 0};
    var spanObject: IspanObject = {timestamp: 0, begin: 0, end: 0};
    var dataArray: Array<IdataArray> = [{timestamp: 0, os: '', browser: '', min_response_time: 0, max_response_time: 0}];
    
    var arrayTimstamp: Array<number> = [];
    var controllTimestamp: number = 0;
  
    for (let i = 0; i < arrayData.length; i++) {

      try {

        var itemData = eval('(' + arrayData[i] + ')');
    
        if (typeof itemData === 'object' && 'type' in itemData && 'timestamp' in itemData) {
  
          if (itemData.type === 'start') {
            startObject = {
              timestamp: itemData.timestamp,
              select: itemData.select,
              group: itemData.group,
            };
  
          } else if (typeof itemData === 'object' && itemData.type === 'stop') {
            stopObject = { timestamp: itemData.timestamp };
  
          } else if (typeof itemData === 'object' && itemData.type === 'span') {
            spanObject = {
              timestamp: itemData.timestamp,
              begin: itemData.begin,
              end: itemData.end,
            };
  
          } else if (typeof itemData === 'object' && itemData.type === 'data') {

            if(controllTimestamp !== itemData.timestamp){
              arrayTimstamp.push(itemData.timestamp);
            }

            controllTimestamp = itemData.timestamp;
  
            dataArray.push({
              timestamp: itemData.timestamp,
              os: itemData.os,
              browser: itemData.browser,
              min_response_time: itemData.min_response_time,
              max_response_time: itemData.max_response_time,
            });
  
          }
        }
        
      } catch (error) {
         return {"status": "error", "arrayLabels": [], "arrayMinResponseValues": [], "arrayMaxResponseValues": []}
      }
    }

    var finalData: Array<any> = [];

    let teste = finalDataConversion(dataArray,startObject, stopObject, spanObject, arrayTimstamp);
    for(let i = 0; i < teste.data.length; i++)
    {
      finalData.push(teste.data[i].value);
    }

    finalData.unshift(teste.labels);

    console.log(finalData)

    return {"status": "success", "data": finalData};
}


function finalDataConversion(dataArray: Array<IdataArray>, startObject: IstartObject, stopObject: IstopObject, spanObject: IspanObject, arrayTimstamp: Array<number>)
{
  dataArray.unshift();

  var arrayReturn: Array<any> = [];

  for(var x = 0; x < arrayTimstamp.length; x++)
  {
    arrayReturn.push({key: arrayTimstamp[x], value:[]})    
  }

  for (var i = 0; i < dataArray.length; i++) {

    if (
      dataArray[i].timestamp >= startObject.timestamp &&
      dataArray[i].timestamp <= stopObject.timestamp
    ) {
      if (
        spanObject.begin <= dataArray[i].timestamp &&
        spanObject.end >= dataArray[i].timestamp
      ) {

        for(var j = 0; j < arrayReturn.length; j++)
        {
          if(dataArray[i].timestamp == arrayReturn[j].key){
            
            arrayReturn[j].value.push(dataArray[i].min_response_time);
            arrayReturn[j].value.push(dataArray[i].max_response_time);
          }          
        }

      } 
    }
  } 

  for(var y = 0; y < arrayReturn.length; y++)
  {
    arrayReturn[y].value.unshift(new Date(arrayReturn[y].key));
  }

  var arrayLabels: Array<string> = ['Date'];
  var countLimit = arrayReturn[0].value.length / 2;
  for(var u = 0; u <= countLimit; u++)
  {
    if(u !== 0){      
      arrayLabels.push(`${dataArray[u].os} ${dataArray[u].browser} Min R. T.`);
      arrayLabels.push(`${dataArray[u].os} ${dataArray[u].browser} Max R. T.`);
    }
  }

  return {"labels": arrayLabels, "data": arrayReturn};
}

export default Graphic;