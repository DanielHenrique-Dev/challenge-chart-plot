const ChartLogic = (data: string): any => {

    var arrayData = data.trim().split('\n');

    arrayData.map((item: string) => {
        
        if(item !== ''){
            
            //let itemData = item;
            eval('itemData='+item)
    
            console.log(itemData);
        }
    })
}

export default ChartLogic;