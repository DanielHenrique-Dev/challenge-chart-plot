import React, { useEffect, useState } from 'react';
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

const Graphic: React.FC<Iprops> = (props: Iprops) => {
  const { data } = props;
  
  const [result, setResult] = useState<JSX.Element>();

  const validData = (data: string) => {

    if(data !== ''){
      const processedData: IprocessedData = ChartLogic(data);

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
                  width="80%"
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

  return ( <>{result}</> );
}

//Function for data conversion
const ChartLogic = (data: string): any => {

  //Transform a string into an array
  var arrayData = data.trim().split('\n');

  //control variables
  var startObject: IstartObject = {timestamp: 0,  select: [], group: []};
  var stopObject: IstopObject = {timestamp: 0};
  var spanObject: IspanObject = {timestamp: 0, begin: 0, end: 0};
  var dataArray: Array<IdataArray> = [{timestamp: 0, os: '', browser: '', min_response_time: 0, max_response_time: 0}];
  
  //Data control variables inside the loop 
  var arrayTimstamp: Array<number> = [];
  var controllTimestamp: number = 0;

  for (let i = 0; i < arrayData.length; i++) {

    try {
      
      //transform string value into object
      var itemData = eval('(' + arrayData[i] + ')');
  
      if (typeof itemData === 'object' && 'type' in itemData && 'timestamp' in itemData) {

        //Insert the data into the start control variable
        if (itemData.type === 'start') {
          startObject = {
            timestamp: itemData.timestamp,
            select: itemData.select,
            group: itemData.group,
          };
        
        //Insert the data into the stop control variable
        } else if (typeof itemData === 'object' && itemData.type === 'stop') {
          stopObject = { timestamp: itemData.timestamp };

        //Insert the data into the span control variable
        } else if (typeof itemData === 'object' && itemData.type === 'span') {
          spanObject = {
            timestamp: itemData.timestamp,
            begin: itemData.begin,
            end: itemData.end,
          };

        //Insert the data into the control variable
        } else if (typeof itemData === 'object' && itemData.type === 'data') {

          //Check if the data timestamp is similar to the control variable
          if(controllTimestamp !== itemData.timestamp){

            //If so, insert the timestamp into the control array
            arrayTimstamp.push(itemData.timestamp);
          }

          //Assign the timestamp to the control variable
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
      return {"status": "error", "data": []}
    }
  }

  //Check if the control variable has been changed, if not return the error.
  if(startObject.timestamp == 0 || stopObject.timestamp == 0 || spanObject.timestamp == 0) {
    return {"status": "error", "data": []}
  } 

  var finalData: Array<any> = [];

  let TemporaryControlVariable = finalDataConversion(dataArray,startObject, stopObject, spanObject, arrayTimstamp);
  for(let i = 0; i < TemporaryControlVariable.data.length; i++)
  {
    finalData.push(TemporaryControlVariable.data[i].value);
  }

  finalData.unshift(TemporaryControlVariable.labels);

  return {"status": "success", "data": finalData};
}

//Auxiliary function for data conversion
function finalDataConversion(dataArray: Array<IdataArray>, startObject: IstartObject, stopObject: IstopObject, spanObject: IspanObject, arrayTimstamp: Array<number>)
{
  dataArray.unshift();

  var arrayReturn: Array<any> = [];

  //Initializing a return array, inserting the timestamp as a key to access the value.
  for(var x = 0; x < arrayTimstamp.length; x++)
  {
     //Validate if the data timestamp is in accordance with the start and stop control variable
     if (
      arrayTimstamp[x] >= startObject.timestamp &&
      arrayTimstamp[x] <= stopObject.timestamp
    ) {
      
      //Validate if the data timestamp is in accordance with the begin and end control variable
      if (
        spanObject.begin <= arrayTimstamp[x] &&
        spanObject.end >= arrayTimstamp[x]
      ) {
          arrayReturn.push({key: arrayTimstamp[x], value:[]}) 
        }
      }   
  }

  for (var i = 0; i < dataArray.length; i++) {

    //Validate if the data timestamp is in accordance with the start and stop control variable
    if (
      dataArray[i].timestamp >= startObject.timestamp &&
      dataArray[i].timestamp <= stopObject.timestamp
    ) {
      
      //Validate if the data timestamp is in accordance with the begin and end control variable
      if (
        spanObject.begin <= dataArray[i].timestamp &&
        spanObject.end >= dataArray[i].timestamp
      ) {

        for(var j = 0; j < arrayReturn.length; j++)
        {
          //inserting the value in the return variable, based on the timestamp in the array
          if(dataArray[i].timestamp == arrayReturn[j].key){
            
            arrayReturn[j].value.push(dataArray[i].min_response_time);
            arrayReturn[j].value.push(dataArray[i].max_response_time);
          }          
        }

      } 
    }
  } 

  //Insert the timestamp in Date format at the beginning of the array, to insert it in the graph
  for(var y = 0; y < arrayReturn.length; y++)
  {
    arrayReturn[y].value.unshift(new Date(arrayReturn[y].key));
  }

  //Inserting the titles in the header array
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