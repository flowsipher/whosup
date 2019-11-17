import './App.css';
import React, { useState, useEffect, useRef } from 'react';
import { Grommet, Box, Button, Grid, Text, Select, ThemeContext, DataTable, Heading} from 'grommet';
import { Run, Money, base } from 'grommet-icons';
import { deepMerge } from "grommet/utils";
import SpendSpark from './SpendSpark.js'
import NetworkBar from './NetworkBar.js'
import { format } from 'd3-format'
import calculateIntervals from './calcInterval.js'
const iconTheme = deepMerge(base, {
  	icon: {
  		size: { medium: '18px'} 
  	}
})

var PacTable = function (props) {
	const [tableData, setTableData] = useState([]);
	const [timeline, setTimeline] = useState({})
	const tableColumns = [
		{header: "Type", property: "juris", sortable: true, 
		render: (val)=> {return val.juris=='Non-Candidate Issue Ads' ? <Money size="medium" theme={iconTheme}/> : 
		<Run size="medium" theme={iconTheme}/>}},
		{header: "PAC", property: "name", sortable: true, primary: true},
		{header: "Side", property: "side", sortable: true, render: (val)=>{ 
			let sideVal = props.sides.filter(s=> s.long==val.side);
			return (
				<b style={{color: sideVal[0].color}}> {sideVal[0].short}</b> 
			)
		}},
		{header: "Timeline", property: "buys", render: (val)=>{return <SpendSpark timeline={timeline} 
		buyData={val.buys} ></SpendSpark> }},
		{header: "Spend", property: "cost", align: "end", sortable: true, 
		 render: (val)=>{return format('$.2s')(val.cost)}},
		{header: "Network Split", property: "test", render: (val)=>{return <NetworkBar buyData={val.buys} ></NetworkBar> }},
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
	}, [props.adData])
	return (
		<Box gridArea="table" direction="row" pad={{ horizontal: "small", vertical: "small", bottom: "0px" }} fill>
              <DataTable
              		  className="testarosta"
                      columns={tableColumns}
                      data={tableData}
                      step={10}
                      size='full'
                      sortable
                      background={{
                        body: ["none", "light-1"],
                      }}
               />
        </Box>
    )
}


export default PacTable