import './App.css';
import React, { useState, useEffect  } from 'react';
import { Box,  Text } from 'grommet';
import { Bar } from '@nivo/bar'
import * as moment from 'moment';
import calculateInterval from './calcInterval.js'
import { AutoSizer } from 'react-virtualized'
const theme = {
  axis: {
  	ticks: {
  		text: {
  			fontSize: '15px',
			fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", "Roboto", "Oxygen", "Ubuntu", "Cantarell", "Fira Sans", "Droid Sans", "Helvetica Neue", sans-serif',
			fill: '#919eab'	
  		}
  	}
  },
  labels:{
    text: {fontSize: '15px'}
  }
}
var ProportionBar = function (props) {
	const [proporData, setProporData] = useState([]);
	useEffect(() => { // Calculate margin data.
		let adData = props.adData;
		var timeline = {start: new Date('December 17, 1995 03:24:00'), end: new Date('December 17, 1995 03:24:00')}
		if(adData.length != 0){ 
			let rows = adData.reduce((acc, curVal) =>{ // Reduce the adData to weeks with two side totals.
				let buyDate = new Date(Date.parse(curVal['week']))
				// Timeline calculation
				timeline['start'] = timeline['start'].getFullYear()<2000 ? buyDate : timeline['start']
				timeline['start'] = buyDate<timeline['start'] ? buyDate : timeline['start']
				timeline['end'] = buyDate>timeline['end'] ? buyDate : timeline['end']
				let rowIndex = acc.findIndex(el=> el.week == curVal.week)
				if (rowIndex!=-1) {
					if( (curVal.side+'ads') in acc[rowIndex]){
						acc[rowIndex][curVal.side+'ads'] = acc[rowIndex][curVal.side+'ads'] + curVal.ads
					} else { acc[rowIndex][curVal.side+'ads'] = curVal.ads }
					if( (curVal.side+'cost') in acc[rowIndex]){
						acc[rowIndex][curVal.side+'cost'] = acc[rowIndex][curVal.side+'cost'] + curVal.cost
					} else { acc[rowIndex][curVal.side+'cost'] = curVal.cost }
				} else {
					let weekAggObj = { week: curVal.week } // Return format
					weekAggObj[(curVal.side+'ads')] = curVal.ads
					weekAggObj[(curVal.side+'cost')] = curVal.cost
					acc.push(JSON.parse(JSON.stringify(weekAggObj)))
				}
				return acc;
			}, [])
			timeline = calculateInterval(timeline)
			let barData = []
			let sideKeys = props.sides.map(s=>s.long)
			timeline.ints.forEach(t=>{ // Reduce the buy weeks to the calculated intervals, then aggregate each sidesvalues
				let intervalBuys = rows.filter(b=>moment(b.week).isBetween(t[0], t[1]))
				let ib;
				if (intervalBuys.length>0){
					ib = intervalBuys.reduce((acc,val)=>{
						var returnObj = {int: t, [sideKeys[0]]: sideKeys[0]+'ads' in val ? acc[sideKeys[0]]+val[sideKeys[0]+'ads'] : acc[sideKeys[0]],[sideKeys[1]]: sideKeys[1]+'ads' in val ? acc[sideKeys[1]]+val[sideKeys[1]+'ads'] : acc[sideKeys[1]] }
						sideKeys.forEach(s=>{
							returnObj[(s+'Color')] = props.sides.filter(sk=>sk.long==s)[0].color
						})
						return returnObj;
					}, {int: t[0], [sideKeys[0]]: 0, [sideKeys[1]]: 0})
				} else{
					ib={int:t, [sideKeys[0]]: 0, [sideKeys[0]]: 0}
				}
				barData.push(ib);
			})

			barData = barData.map(b=>{ // Turn raw values of their spend into proportions.
				let dateFormatString = timeline.unit == 'week' ? 'M/D': 'MMM.'
				let dateDisplay = timeline.change>1 ? (b.int[0].format(dateFormatString)+'-'+b.int[1].format(dateFormatString)) : b.int[0].format(dateFormatString)
				var returnObj = {int: dateDisplay, [sideKeys[0]]: b[sideKeys[0]]/(b[sideKeys[0]]+b[sideKeys[1]]), [sideKeys[1]]: b[sideKeys[1]]/(b[sideKeys[0]]+b[sideKeys[1]])}
				sideKeys.forEach(s=>{
					returnObj[(s+'Color')] = props.sides.filter(sk=>sk.long==s)[0].color
				})
				return returnObj;
			})
			barData = barData.reverse()
			rows = rows.sort((a, b) => b['week']-a['week'])
			setProporData(barData)
		}
	}, [props.adData])
	return (
	<Box gridArea="chart2" pad={{ horizontal: "small", vertical: "small" }} flex>
		<Text> Proportion of total spending by side </Text>
		<AutoSizer>
    	{({ height, width }) => (
		<Bar
				height={height}
				width={width}
			   theme={theme}
		       data={proporData}
		       colors={(val)=>{return val.data[(val.id+'Color')];}}
		       indexBy='int'
		       keys={props.sides.map(s=>s.long)}
		       enableLabel={false}
		       minValue={0}
		       maxValue={1}
		       indexBy="int"
		       margin={{ top: 0, right: 17, bottom: 45, left: 85 }}
		       layout="horizontal"
		       axisTop={null}
		       axisLeft={{ tickSize: 0, tickPadding: 5, tickRotation: 0, legend: '', legendOffset: 0 }}
		       axisBottom={{ tickSize: 0, tickPadding: 5, tickRotation: 0, tickValues: [0,.25,.5,.75, 1],
		       	format: val=>(val*100)+'%'
			   }}
		       enableGridY={false}
		       animate={true}
		       motionStiffness={90}
		       motionDamping={15}
		       padding={.1}
		       markers={[
	             {
	               axis: 'x',
	               value: .5,
	               lineStyle: { stroke: '#919eab', strokeWidth: 2, strokeDasharray: "4 4" },
	             },
	           ]}
		   />
		)}
		</AutoSizer>
	 </Box>
	)
}

export default ProportionBar

/*
<Box gridArea="chart1" flex pad={{ horizontal: "small", vertical: "small" }}>
			<Heading level={4} margin="none"> Ad Margin </Heading>
		  	<FlexibleXYPlot xType="time">
	          <HorizontalGridLines />
	          <XAxis style={{
					  line: {'stroke-width': 1},
					  ticks: {stroke: '#ADDDE1'},
					  text: {stroke: 'none', fill: '#6b6b76', fontWeight: 400, fontSize: 18}
					}}
				/>
	          <YAxis style={{
					  line: {'stroke-width': 0},
					  ticks: {stroke: '#ADDDE1'},
					  text: {stroke: 'none', fill: '#6b6b76', fontWeight: 400, fontSize: 18}
					 }}
				/>
	          <LineSeries
	            data={props.marginData.map(el=>{ return {x: el.week, y: el.marginads} })}
	          />
		    </FlexibleXYPlot>
		</Box>
		*/