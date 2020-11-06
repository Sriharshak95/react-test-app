import React from 'react';
import {
  PieChart, Pie, Legend,Tooltip
} from 'recharts';
import {useSelector} from 'react-redux';

export default function Example() {
    const chartdata = useSelector(state=>state.chart_data);
    const data02 = [
      { name: 'Mutual Fund', value: chartdata.mv, fill:'#b09b40'},
      { name: 'ETFs', value: chartdata.etf, fill:'#63bed6' }
    ];
    return (
      <PieChart width={280} height={280}>
        <Pie data={data02} dataKey="value" cx={130} cy={150} innerRadius={50} outerRadius={70} fill="#82ca9d"/>
        <Tooltip />
        <Legend layout="horizontal" wrapperStyle={{top:20,right:0, left:30,fontSize:13}} width={200} height={24}/>
      </PieChart>
    );
}