import './App.css';
import React, { useState, useEffect, useRef } from 'react';
import { Grommet, Box, Button, Grid, Text, Select, ThemeContext, DataTable, Heading} from 'grommet';
import { Run, Money, base } from 'grommet-icons';
import { deepMerge } from "grommet/utils";
import SpendSpark from './SpendSpark.js'
import NetworkBar from './NetworkBar.js'
import SpendBox from './SpendBox.js'
import SpendBoxLegend from './SpendBoxLegend.js'
import { format } from 'd3-format'
import calculateIntervals from './calcInterval.js'

import RaceSelect from './RaceSelect.js'


   const iconTheme = deepMerge(base, {
	icon: {
		size: { medium: '18px'} 
	}
})

var PacTable = function (props) {
	const [tableData, setTableData] = useState({pac: [], box: [], dim: [], timeline: {start: new Date('December 17, 1995 03:24:00'), end: new Date('December 17, 1995 03:24:00')}});
	useEffect(() => { // Calculate table data.
		let pacData = props.adData.pac
		let adData = props.adData.ad
		var timeline = {start: new Date('December 17, 1995 03:24:00'), end: new Date('December 17, 1995 03:24:00')}
		var tableData = {}
		if(adData.length != 0){
			let spendDimensions = [
									pacData.reduce((min, p) => p.whiskerlow < min ? p.whiskerlow : min, pacData[0].whiskerlow), 
									pacData.reduce((max, p) => p.whiskerhigh > max ? p.whiskerhigh : max, pacData[0].whiskerhigh)
								  ];
			let boxData = pacData.map(p=>{
				return {name: p.name, whiskerHigh: p.whiskerhigh, whiskerLow: p.whiskerlow, quartile1: p.quartile1, quartile2: p.quartile2, quartile3: p.quartile3, outliers: []}
			})
			tableData['box'] = boxData
			tableData['dim'] = spendDimensions
			let rows = adData.reduce((acc, curVal) =>{
				let rowIndex = acc.findIndex(el=> el.name == curVal.name)
				let buyDate = new Date(Date.parse(curVal['week']))
				// Timeline calculation
				timeline['start'] = timeline['start'].getFullYear()<2000 ? buyDate : timeline['start']
				timeline['start'] = buyDate<timeline['start'] ? buyDate : timeline['start']
				timeline['end'] = buyDate>timeline['end'] ? buyDate : timeline['end']
				// PAC Accumulation
				if (rowIndex!=-1) { 
					acc[rowIndex].ads = acc[rowIndex].ads + curVal.ads
					acc[rowIndex].cost = acc[rowIndex].cost + curVal.cost
					acc[rowIndex].buys.push(curVal)
				} else {
					curVal.buys = [JSON.parse(JSON.stringify(curVal))]
					let sideVal = props.adData.sides.filter(s=> s.long==curVal.side)[0]
					curVal.color = sideVal.color;
					acc.push(JSON.parse(JSON.stringify(curVal)))
				}
				return acc;
			}, [])
			tableData['timeline'] = calculateIntervals(timeline)
			tableData['pac'] = rows
			console.log('render triggered')
			setTableData(tableData)
		}
	}, [props.adData])
	const tableColumns = [
		{header: <Box direction="column"> 
					<Text size={"large"} className="dashTitle" style={{whiteSpace: "nowrap", overflow: "visible"}}> {props.race} </Text>
					<Text> 2018 </Text>
				</Box>, property: "juris", sortable: true, 
		render: (val)=> {
			return val.juris=='Non-Candidate Issue Ads' ? <Money size="medium" theme={iconTheme} color={val.color}/> : 
		<Run size="medium" theme={iconTheme} color={val.color}/>}},
		{header: "", property: "name", sortable: false, search: false, primary: true, render: (val)=>{return <span> {val.name} </span>}},
		{header: "Timeline", property: "buys", render: (val)=>{return <SpendSpark timeline={tableData.timeline} 
		buyData={val.buys} color={val.color} ></SpendSpark> }},
		{header: "Spend", property: "cost", align: "end", sortable: true, 
		 render: (val)=>{return format('$.2s')(val.cost)}},
		{header:<Box fill> <Text className="legText" color="#919eab"> Spend Distribution <br /> </Text>
			<SpendBoxLegend dimensions={tableData.dim}></SpendBoxLegend> </Box>
		, property: "test", render: (val)=>{
		return (
			<SpendBox 
				boxData={tableData.box.filter(f=>{return f.name==val.name})[0]} 
				dimensions={tableData.dim}
				color={val.color}
			>
			</SpendBox>
		) }},
		{header: "Ads", property: "ads", align: "end", sortable: true, render: (val)=>{return format('.2s')(val.ads)}}
	]
	return (
		<Box gridArea="table" direction="row" pad={{ horizontal: "small" }} fill>
              <DataTable
              		  className="testarosta"
                      columns={tableColumns}
                      data={tableData.pac}
                      step={10}
					  size='full'
					  border={{
						"header": {
						  "color": "#919eab",
						  "side": "bottom"
						}
					  }}
                      sortable
                      background={{
                        body: ["none", "light-1"],
                      }}
               />
        </Box>
    )
}


export default PacTable


/*
            <Box gridArea="header" alignContent="center" pad={{top: "5px"}} >
            	<Text size="large" weight="bold" alignSelf="center" color="black"> 
					Arizona 
					<RaceSelect options={availableRaces} value={adQuery.race} onChange={(option) =>{ adQuery.race = option; setAdQuery(JSON.parse(JSON.stringify(adQuery))); }}> </RaceSelect>
					Race
	           	</Text>
            </Box>
*/