import './App.css';
import React, { useState, useEffect } from 'react';
import { Box, Text } from 'grommet';
import { Line } from '@nivo/line'
import { format } from 'd3-format'
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
  grid: {
	  line: {
	    stroke: "grey",
	    strokeWidth: 1,
	    strokeDasharray: "1 5"
	  }
	}
}
var MarginChart = function (props) {
	const [marginData, setMarginData] = useState([]);
		useEffect(() => { // Calculate margin data.
		var adData = props.adData
		if(adData.length != 0){ 
			let rows = adData.reduce((acc, curVal) =>{ // Reduce the adData to weeks with two side totals.
				let rowIndex = acc.findIndex(el=> el.week == curVal.week)
				if (rowIndex!=-1) {
					if( (curVal.side+'ads') in acc[rowIndex]){
						acc[rowIndex][curVal.side+'ads'] = acc[rowIndex][curVal.side+'ads'] + curVal.ads
					} else { acc[rowIndex][curVal.side+'ads'] = curVal.ads }
					if( (curVal.side+'cost') in acc[rowIndex]){
						acc[rowIndex][curVal.side+'cost'] = acc[rowIndex][curVal.side+'cost'] + curVal.cost
					} else { acc[rowIndex][curVal.side+'cost'] = curVal.cost }
				} else {
					let weekAggObj = {week: curVal.week} // Return format
					weekAggObj[(curVal.side+'ads')] = curVal.ads
					weekAggObj[(curVal.side+'cost')] = curVal.cost
					acc.push(JSON.parse(JSON.stringify(weekAggObj)))
				}
				return acc;
			}, [])
			var sideKeys=props.sides.map(el=>el.long)
			rows.forEach(el=>{
				var sidesFound = []
				// This checks that both sides are found within the time interval, someones it's just one side.
				Object.keys(el).forEach(k=>{
					sideKeys.forEach(s=>{
						if (k.indexOf(s) !== -1 & sidesFound.indexOf(sideKeys.indexOf(s)) == -1) {
							sidesFound.push(sideKeys.indexOf(s))
						}
					})
				})
				if (sidesFound.length == 2){
					el['marginads'] = el[sideKeys[0]+'ads'] - el[sideKeys[1]+'ads']
					el['margincost'] = el[sideKeys[0]+'cost'] - el[sideKeys[1]+'cost']
				} else {
					let multiplier = sidesFound[0] == 0 ? 1 : -1 // Ensures that uncontested weeks are aligned with contested.
					el['marginads'] = el[sideKeys[sidesFound[0]]+'ads'] * multiplier
					el['margincost'] = el[sideKeys[sidesFound[0]]+'cost'] * multiplier
				}
				el['week'] = new Date(Date.parse(el['week']))
			})
			rows = rows.sort((a, b) => a['week']-b['week'])
			setMarginData(rows)
		}
	}, [props.adData])
	return (
	<Box gridArea="chart1" pad={{ horizontal: "small", vertical: "small", top: "5px" }} flex>
		<Text> Ads per week by side </Text>
		<AutoSizer>
    	{({ height, width }) => (
		<Line
			height={height}
			width={width}
			colors={(val)=>val.color}
			margin={{ top: 10, right: 15, bottom: 25, left: 35 }}
		    data={[
		    	{
			    	'id': 'side1', 
			    	'data': marginData.filter(el=>(props.sides[0].long+'ads') in el)
							.map(el=>{ return {x: el.week, y: el[props.sides[0].long+'ads']}}),
					'color': props.sides.length>0 ? props.sides[0].color : 'red'
		    	},
		    	{
			    	'id': 'side2', 
			    	'data': props.sides.length>1 ? marginData.filter(el=>(props.sides[1].long+'ads') in el)
							.map(el=>{ return {x: el.week, y: el[props.sides[1].long+'ads']}}) : [],
					'color':props.sides.length>1 ? props.sides[1].color : 'red'
		    	}
		    ]}
		    xScale={{
		      type: 'time',
		      format: 'native',
		      precision: 'day'
		    }}
		    yScale={{
		      type: 'linear',
		    }}
		    axisLeft={{
		      format: (value) => {return format('.1s')(value)},
		      orient: 'left',
              tickSize: 0,
              tickValues: 4,
              tickPadding: 5,
              tickRotation: 0,
		      legendOffset: 12,
		    }}
		    gridYValues={5}
		    enableGridX={false}
		    enableGridY={true}
		    axisBottom={{
	          format: '%b %d',
	          tickValues: 5,
	          tickSize: 0
	        }}
		    useMesh={false}
		    enableSlices={false}
		    theme={theme}
		  />
		)}
		</AutoSizer>
	 </Box>
	)
}

export default MarginChart

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