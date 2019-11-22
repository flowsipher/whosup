import React, { useState, useEffect} from 'react';
import { ScatterPlot } from '@nivo/scatterplot'
import { Box, Text } from 'grommet';
import { format } from 'd3-format'
import { AutoSizer } from 'react-virtualized'
const keys = ['ABC', 'CBS', 'FOX', 'NBC', 'Other']
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

var NetworkSplit = function (props) {
	const [splitData, setSplitData] = useState([])
	useEffect(()=>{ // Calculate totals for each network, then proportions of buy.
		var networkTotals = []
		props.sides.forEach(s=>{
			var sideTotals = {id: s.long, data: [], color: s.color}
			var buyTotal = 0
			var bd = props.adData.filter(f=>f.side==s.long)
			keys.forEach(k=>{
				let networkBuys = k!='Other' ? bd.filter(el=>k==el.network) :  bd.filter(el=>keys.indexOf(el.network)==-1)
				var networkTotal = 0
				networkBuys.forEach(n=>{
					networkTotal = networkTotal+n.cost
				})
				sideTotals.data.push({x: networkTotal, y: k})
				buyTotal = buyTotal + networkTotal
			}) 
			sideTotals.data = sideTotals.data.map(d=>{return {x: d.x/buyTotal, y: d.y}}) 
			networkTotals.push(sideTotals)
		})
		setSplitData(networkTotals)
	}, [props.adData, props.sides])
	return (
		<Box gridArea="chart3" pad={{ horizontal: "small", vertical: "medium", top: "5px" }} flex>
			<Text> Percentage of side spend per network </Text>
			<AutoSizer>
    		{({ height, width }) => (
			<ScatterPlot
				height={height}
				width={width}
			    data={splitData}
			    colors={(el)=>{
			    	if(props.sides.filter(s=>s.long==el.serieId).length>0){
			    		return props.sides.filter(s=>s.long==el.serieId)[0].color
			    	} else {
			    		return 'red'
			    	}}
			    	}
			    margin={{ top: 10, right: 10, bottom: 45, left: 47 }}
			    xScale={{ type: 'linear', min: 0, max: 'auto' }}
			    yScale={{ type: 'point', min: 'auto', max: 'auto'}}
			    blendMode="multiply"
			    nodeSize={8}
			    xFormat={function(e){return e+" kg"}}
			    enableGridX={false}
			    enableGridY={false}
			    axisTop={null}
			    axisRight={null}
			    axisLeft={{
			        orient: 'left',
			        tickSize: 0,
			        tickPadding: 5,
			        tickRotation: 0,
			    }}
    		    axisBottom={{
    		      format: (value) => {return format('.0%')(value)},
    		      orient: 'bottom',
                  tickSize: 0,
                  tickValues: 4,
                  tickPadding: 20,
                  tickRotation: 0,
    		    }}
    		    gridXValues={5}
    		    enableGridX={false}
			    legends={[]}
			    theme={theme}
			/>
			)}
			</AutoSizer>
		</Box>
    )
}

export default NetworkSplit












