import React from 'react';
import {XYPlot, XAxis, YAxis, HorizontalGridLines, LineSeries} from 'react-vis';

class Chart extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            displayData:{
                allData: true
            }
        }
    }

    renderLinesPerConditionTime(data){
        if(data[0] === undefined){
            return <div>Currently no data is available</div>
        }else{
            const milestoneConditionTime = data.map(item=> new Date(item[0]).getTime());
            const dataPerConditionTime = data.map(item=> item[1]);
            let dataPerYear = [];
            let perConditionTimeData = [];
            if(this.state.displayData.allData){
                perConditionTimeData = data.map((item) =>({
                    x: new Date(item[0]).getTime(), // "tickValues()" have to suitable data type with "renderLines()"
                    y: item[1]
                }));
            }
            if(this.state.displayData.perYear){
                for(let i = 0; i <= milestoneConditionTime.length-1; i++){
                    if(i>0){
                        const currentPos = new Date(milestoneConditionTime[i]).getFullYear()
                        const previousPos = new Date(milestoneConditionTime[i-1]).getFullYear()
                        if(previousPos !== currentPos){
                            perConditionTimeData.push({
                                x: currentPos,
                                y: dataPerConditionTime[i]
                            });
                        }
                    }else{
                        perConditionTimeData.push({
                            x: new Date(milestoneConditionTime[i]).getFullYear(),
                            y: dataPerConditionTime[i]
                        });
                    }
                }
                dataPerYear = perConditionTimeData;
            }

            if(this.state.displayData.perFiveYear){
                for(let i = 0; i <= milestoneConditionTime.length-1; i++){
                    if(i>0){
                        const currentPos = new Date(milestoneConditionTime[i]).getFullYear()
                        const previousPos = new Date(milestoneConditionTime[i-1]).getFullYear()
                        if(previousPos !== currentPos){
                            perConditionTimeData.push({
                                x: currentPos,
                                y: dataPerConditionTime[i]
                            });
                        }
                    }else{
                        perConditionTimeData.push({
                            x: new Date(milestoneConditionTime[i]).getFullYear(),
                            y: dataPerConditionTime[i]
                        });
                    }
                }
                dataPerYear = perConditionTimeData;
                perConditionTimeData = [];
                perConditionTimeData.push(dataPerYear[0]);
                let nextDataPos = dataPerYear[0].x;
                for(let i = 0; i <= dataPerYear.length-1; i++){
                    // console.log('Before, nextDataPos: ',nextDataPos,'perConditionTimeData: ',perConditionTimeData);
                    if(i===0){
                        nextDataPos = dataPerYear[0].x - 5;
                    }else{
                        if(dataPerYear[i].x === nextDataPos){
                            nextDataPos = nextDataPos - 5
                            // console.log('dataPerYear[i].x: ',dataPerYear[i].x,' i:',i)
                            if(dataPerYear[i].x !== dataPerYear[i-1].x){
                                perConditionTimeData.push({
                                    x: dataPerYear[i].x,
                                    y: dataPerYear[i].y
                                });
                            }
                        }
                        // console.log('After, nextDataPos: ',nextDataPos,'perConditionTimeData: ',perConditionTimeData);   
                    }
                }
            }
            
            if(this.state.displayData.perMonth){
                const getFullDate = data.map(item => {
                    return [...item[0]];
                })
                for(let k=0;k<=getFullDate.length-1;k++){
                    if(k>0){
                        const previousYearItem  = getFullDate[k-1][0] + getFullDate[k-1][1] + getFullDate[k-1][2] + getFullDate[k-1][3];
                        const currentYearItem   = getFullDate[k][0]   + getFullDate[k][1]   + getFullDate[k][2]   + getFullDate[k][3];
                        const previousMonthItem = getFullDate[k-1][5] + getFullDate[k-1][6];
                        const currentMonthItem  = getFullDate[k][5]   + getFullDate[k][6];
                        if(currentYearItem === previousYearItem){   
                            if(currentMonthItem !== previousMonthItem){
                                perConditionTimeData.push({
                                    x: new Date(milestoneConditionTime[k]).getTime(),
                                    y: dataPerConditionTime[k]
                                }); //getFullDate[k][5]+getFullDate[k][6]
                            }
                        }
                    }else{
                        perConditionTimeData.push({
                            x: new Date(milestoneConditionTime[k]).getTime(),
                            y: dataPerConditionTime[k]
                        });
                    }
                }
            }
            if(this.state.displayData.perWeek){
                for(let l = 0; l<=milestoneConditionTime.length-1;l++){
                    if(new Date(milestoneConditionTime[l]).getDay()===5){
                        perConditionTimeData.push({
                            x: new Date(milestoneConditionTime[l]).getTime(),
                            y: dataPerConditionTime[l]
                        });
                    }
                }
            }
            return perConditionTimeData;
        }
    }

    tickValuesXAxisPerConditionTime(data){
        if(data[0] === undefined){
            return <div>Currently no data is available</div>
        }else{
            const allMilestone = data.map((item)=> new Date(item[0]).getTime());
            let dataTimePerYear = [];
            let perConditionTime = [];
            if(this.state.displayData.allData){
                perConditionTime = allMilestone;
            }
            if(this.state.displayData.perYear){
                for(let i = 0; i <= allMilestone.length-1; i++){
                    if(i>0){
                        const currentPos = new Date(allMilestone[i]).getFullYear()
                        const previousPos = new Date(allMilestone[i-1]).getFullYear()
                        if(previousPos !== currentPos){
                            perConditionTime.push(new Date(allMilestone[i]).getFullYear());
                        }
                    }else{
                        perConditionTime.push(new Date(allMilestone[i]).getFullYear());
                    }
                }
                dataTimePerYear = perConditionTime;
            }

            if(this.state.displayData.perFiveYear){
                for(let i = 0; i <= allMilestone.length-1; i++){
                    if(i>0){
                        const currentPos = new Date(allMilestone[i]).getFullYear()
                        const previousPos = new Date(allMilestone[i-1]).getFullYear()
                        if(previousPos !== currentPos){
                            perConditionTime.push(new Date(allMilestone[i]).getFullYear());
                        }
                    }else{
                        perConditionTime.push(new Date(allMilestone[i]).getFullYear());
                    }
                }
                dataTimePerYear = perConditionTime;
                perConditionTime = [];
                perConditionTime.push(dataTimePerYear[0]);
                let nextDataPos = dataTimePerYear[0];
                for(let i = 0; i <= dataTimePerYear.length-1; i++){
                    // console.log('Before, nextDataPos: ',nextDataPos,'perConditionTime: ',perConditionTime);
                    if(i===0){
                        nextDataPos = dataTimePerYear[0] - 5;
                    }else{
                        if(dataTimePerYear[i] === nextDataPos){
                            nextDataPos = nextDataPos - 5
                            // console.log('dataPerYear[i].x: ',dataTimePerYear[i],' i:',i)
                            if(dataTimePerYear[i] !== dataTimePerYear[i-1]){
                                perConditionTime.push(dataTimePerYear[i]);
                            }
                        }
                        // console.log('After, nextDataPos: ',nextDataPos,'perConditionTime: ',perConditionTime);   
                    }
                }
            }

            if(this.state.displayData.perMonth){
                const getFullDate = data.map(item => {
                    return [...item[0]];
                })
                for(let k=0;k<=getFullDate.length-1;k++){
                    if(k>0){
                        const prevkousYearktem  = getFullDate[k-1][0] + getFullDate[k-1][1] + getFullDate[k-1][2] + getFullDate[k-1][3];
                        const currentYearktem   = getFullDate[k][0]   + getFullDate[k][1]   + getFullDate[k][2]   + getFullDate[k][3];
                        const prevkousMonthktem = getFullDate[k-1][5] + getFullDate[k-1][6];
                        const currentMonthktem  = getFullDate[k][5]   + getFullDate[k][6];
                        if(currentYearktem === prevkousYearktem){   
                            if(currentMonthktem !== prevkousMonthktem){
                                perConditionTime.push(new Date(allMilestone[k]).getTime());
                            }
                        }
                    }else{
                        perConditionTime.push(new Date(allMilestone[k]).getTime());
                    }
                }
            }
            if(this.state.displayData.perWeek){
                perConditionTime = allMilestone.filter((item) => {
                    if(new Date(item).getDay() === 5){
                        return item;
                    }
                })
            }
            return perConditionTime;
        }
    }
    
    render(){
        
        return <div>
            <div className="chart-display">
                <XYPlot
                    width={1140}
                    height={500}>
                    <HorizontalGridLines />
                    <LineSeries
                        data={this.renderLinesPerConditionTime(this.props._values.dataset.data)}/>
                    <XAxis
                        tickValues={this.tickValuesXAxisPerConditionTime(this.props._values.dataset.data)}
                        tickLabelAngle={-90}
                        title="Date"
                        tickFormat={
                            this.state.displayData.perMonth ? v=>`${new Date(v).getMonth()}-${new Date(v).getFullYear()}`
                            : this.state.displayData.perWeek ? v=>`${new Date(v).getDay()}`
                            : null
                        }
                    />
                    <YAxis title="Value" />
                </XYPlot>
                <div>Click one of below buttons to display data</div>
                <div className="list-durations">
                    <button onClick={()=>{
                        this.setState({
                            displayData:{
                                allData: true
                            }
                        })}}>Total</button>    
                    <button onClick={()=>{
                        this.setState({
                            displayData:{
                                allData: false,
                                perWeek: true
                            }
                        })}}>Per Week</button>
                    <button onClick={()=>{
                        this.setState({
                            displayData:{
                                allData: false,
                                perMonth: true
                            }
                        })}}>Per Month</button>
                    <button onClick={()=>{
                        this.setState({
                            displayData:{
                                allData: false,
                                perYear: true
                            }
                        })}}>Per Year</button>
                    <button onClick={()=>{
                        this.setState({
                            displayData:{
                                allData: false,
                                perFiveYear: true
                            }
                        })}}>Per Five Year</button>
                </div>
            </div>
        </div>
    }
}

export default Chart;
