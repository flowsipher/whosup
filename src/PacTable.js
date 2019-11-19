import './App.css';
import React, { useState, useEffect, useRef } from 'react';
import { Grommet, Box, Button, Grid, Text, Select, ThemeContext, DataTable, Heading} from 'grommet';
import { Run, Money, base } from 'grommet-icons';
import { deepMerge } from "grommet/utils";
import SpendSpark from './SpendSpark.js'
import NetworkBar from './NetworkBar.js'
import SpendBox from './SpendBox.js'
import { format } from 'd3-format'
import calculateIntervals from './calcInterval.js'

import RaceSelect from './RaceSelect.js'

const availableRaces = [
	'Senate',
	'House',
	'President',
	'Governor',
	'Attorney General',
	'Secretary of State',
	'Superintendent of Public Instruction',
	'State Treasurer',
	'Mayor',
	'Prop 127',
	'Prop 305',
	'Prop 126',
	'Impeachment',
	'Tax Returns',
	'GOTV',
	'Red for Ed'
   ]
   const iconTheme = deepMerge(base, {
	icon: {
		size: { medium: '18px'} 
	}
})

var PacTable = function (props) {
	const [tableData, setTableData] = useState([]);
	const [timeline, setTimeline] = useState({})
	const [spendDim, setSpendDim] = useState([]) // Spend Dimensions
	const [boxData, setBoxData] = useState([])
	const tableColumns = [
		{header: <span>Race: 
			<RaceSelect options={availableRaces} value={props.race} onChange={(option)=>props.onRaceSelect(option)}> </RaceSelect>
			<br />
			Fuck
		</span> , property: "name", sortable: false, search: false, primary: true, render: (val)=>{return <span> {val.name} </span>}},
		{header: "Type", property: "juris", sortable: true, 
		render: (val)=> {return val.juris=='Non-Candidate Issue Ads' ? <Money size="medium" theme={iconTheme}/> : 
		<Run size="medium" theme={iconTheme}/>}},
		{header: "Side", property: "side", sortable: true, render: (val)=>{ 
			let sideVal = props.sides.filter(s=> s.long==val.side);
			return (
				<b style={{color: sideVal[0].color}}> {sideVal[0].short}</b> 
			)
		}},
		{header: "Timeline", property: "buys", render: (val)=>{return <SpendSpark timeline={timeline} 
		buyData={val.buys} color={props.sides.filter(s=>s.long==val.side)[0].color} ></SpendSpark> }},
		{header: "Spend", property: "cost", align: "end", sortable: true, 
		 render: (val)=>{return format('$.2s')(val.cost)}},
		{header: "Spend ", property: "test", render: (val)=>{
		return (
			<SpendBox 
				boxData={boxData.filter(f=>{return f.name==val.name})[0]} 
				dimensions={spendDim}
				color={props.sides.filter(s=>s.long==val.side)[0].color}
			>
			</SpendBox>
		) }},
		{header: "Ads", property: "ads", align: "end", sortable: true, render: (val)=>{return format('.2s')(val.ads)}}
	]
	useEffect(() => { // Calculate table data.
		let adData = props.adData
		var timeline = {start: new Date('December 17, 1995 03:24:00'), end: new Date('December 17, 1995 03:24:00')}
		if(adData.length != 0){
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
					acc.push(JSON.parse(JSON.stringify(curVal)))
				}
				return acc;
			}, [])
			setTimeline(calculateIntervals(timeline))
			setTableData(rows)
		}
		if (props.pacData.length != 0){
			let spendDimensions = [
									props.pacData.reduce((min, p) => p.whiskerlow < min ? p.whiskerlow : min, props.pacData[0].whiskerlow), 
									props.pacData.reduce((max, p) => p.whiskerhigh > max ? p.whiskerhigh : max, props.pacData[0].whiskerhigh)
								  ];
			let boxData = props.pacData.map(p=>{
				return {name: p.name, whiskerHigh: p.whiskerhigh, whiskerLow: p.whiskerlow, quartile1: p.quartile1, quartile2: p.quartile2, quartile3: p.quartile3, outliers: []}
			})
			console.log(spendDimensions)
			setBoxData(boxData)
			setSpendDim(spendDimensions)
		}
	}, [props.adData, props.pacData])
	return (
		<Box gridArea="table" direction="row" pad={{ horizontal: "small", vertical: "small", bottom: "0px" }} fill>
              <DataTable
              		  className="testarosta"
                      columns={tableColumns}
                      data={tableData}
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