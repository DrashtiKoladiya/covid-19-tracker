import React, { useEffect, useState } from 'react';
import Axios from 'axios';
import url from '../../Url.js';
import {Line,Bar} from 'react-chartjs-2';
import styles from './Chart.module.css';

const Chart = ({data,country}) => {
    const [dailyData,setdailyData] = useState([]);

    useEffect(() => {
        Axios.get(`${url}/daily`)
            .then(({data}) => {
            const newDailydata = data.map((dailyy) => ({
                confirmed:dailyy.confirmed.total,
                deaths:dailyy.deaths.total,
                date:dailyy.reportDate
            }));
            setdailyData(newDailydata);
        });
    },[]);

    const LineChart = ( 
        (dailyData.length)
        ?(
            <Line 
                data = {{
                    labels:dailyData.map(({date}) => date),
                    datasets:[{
                        data:dailyData.map(({confirmed}) => confirmed),
                        label:"Infected",
                        borderColor:'#3333ff',
                        fill:true
                    },{
                        data:dailyData.map(({deaths}) => deaths),
                        label:"Deaths",
                        backgroundColor:'rgba(255,0,0,0.5)',
                        fill:true
                    }]
            }}/>
        ):null
    );

    const BarChart = (
        (data.confirmed)
        ?(
            <Bar data={{
                labels:['Toatal Infected','Total Active','Recovered','Deaths'],
                datasets:[{
                    label:'people',
                    backgroundColor:[
                        'rgba(0, 0, 250, 0.5)',
                        'rgba(218,29,129,0.5)',
                        'rgba(0, 0, 250, 0.5)',
                        'rgba(250, 0, 0, 0.5)'
                    ],
                    data:[data.confirmed.value,data.confirmed.value-data.recovered.value-data.deaths.value,data.recovered.value,data.deaths.value],
                }]
            }}
            options={{
                legend:{display:false},
                title:{display:true,text:`current status in ${country}`}
            }}/>
        ):null
    );



    return(
        <div className={styles.container}>
            {country ? BarChart : LineChart}
        </div>
    );    
}

/*
function Chart(){
    return(
        <h1>Chart</h1>
    );
}
*/

export default Chart;