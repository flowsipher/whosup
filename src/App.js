import React, { useState, useEffect } from 'react';
import { Vega } from 'react-vega';
import axios from 'axios';
import '../node_modules/react-vis/dist/style.css';
import MarginChart from './MarginChart.js'
import ProportionBar from './ProportionBar.js'
import PacTable from './PacTable.js'
import RaceSelect from './RaceSelect.js'
import { Run, Money, base } from 'grommet-icons';
import DashFooter from './DashFooter.js'
import { Grommet, Box, Button, Grid, Text, Select, ThemeContext, DataTable, generate,
	Table,
	TableCell,
	TableHeader,
	TableRow,
	TableFooter
} from 'grommet';
import { deepMerge } from "grommet/utils";

import './App.css';

const iconTheme = deepMerge(base, {
  	icon: {
  		size: { medium: '18px'} 
  	}
})

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
 'Prop 129',
 'Prop 126',
 'Impeachment',
 'Tax Returns',
 'GOTV',
 'Red for Ed'
]

const partisanColors = {'Democrat': 'blue', 'Republican': 'red'}
const colors = ['green', 'purple', 'orange'];

const startingQuery = {
	xaxis: "week",
	yaxis: "count",
	color: "p.name",
	race: "Senate",
	cycle: "2018"
}

function App() {
	const [adData, setAdData] = useState([]);
	const [adQuery, setAdQuery] = useState(startingQuery);
	const [sides, setSides] = useState([])
	useEffect(() => { // Get starting chart data.
		axios.get(process.env.REACT_APP_GET_ADDATA+'/race', {params: adQuery}) 
		.then(function (response) {
			console.log(response.data)
			setAdData(response.data);
		})
	}, [adQuery]);
	useEffect(()=>{
		var sides = [];
		adData.forEach(ad=>{
			if (sides.indexOf(ad.side) == -1){
				sides.push(ad.side);
			}
		})
		sides = sides.sort()
		sides = sides.map(s=>{
			return {short: s.slice(0,1), long: s, color: s in partisanColors ? partisanColors[s]: colors[sides.indexOf(s)]}
		})
		console.log(sides)
		setSides(sides)
	}, [adData])

	return (
		<Grommet full theme={generate(20, 5)}>
		    <Grid
            fill
            rows={["xxsmall", "flex"]}
            columns={["2/3", "1/3"]}
            areas={[
              ['header', 'header'],
              ["table", "charts"],
              ['footer', 'footer']
            ]}
          >
            <Box
              gridArea="header"
              alignContent="center"
              pad={{top: "5px"}}
            >
            	<Text size="large" weight="bold" alignSelf="center"> Arizona 
		               <RaceSelect
		                     options={availableRaces}
		                     value={adQuery.race}
		                     onChange={(option) =>{ console.log(option);adQuery.race = option; console.log(adQuery); setAdQuery(JSON.parse(JSON.stringify(adQuery))); }}
		                  > </RaceSelect>
		                Race
	           	</Text>
            </Box>
            <PacTable adData={adData} sides={sides}> </PacTable>
            <DashFooter sides={sides}> </DashFooter>
		    <Grid
            fill
            rows={["xxsmall", "1/3", "1/3", "1/3"]}
            areas={[
              ['chartheader'],
              ["chart1"],
              ["chart2"],
              ["chart3"]
            ]}
            gridArea={'charts'}
            >
            <Box gridArea="chartheader" direction="row" pad={{ horizontal: "small", vertical: "small" }} fill>
	             <Table> 
	             	<TableHeader  className="noLeftPad">
	             		<TableRow className="noLeftPad">
	             			<TableCell className="noLeftPad"> Race Comparisons </TableCell>
	             		</TableRow>
	             	</TableHeader>
	             </Table>
             </Box>
	         <MarginChart adData={adData}> </MarginChart>
	         <ProportionBar adData={adData}> </ProportionBar>
            </Grid>
          </Grid>
		</Grommet>
	);
}
/* 			
 <ControlPanel changeQuery={updateQuery} />
 #signalListeners={signalListeners}
*/
export default App;
