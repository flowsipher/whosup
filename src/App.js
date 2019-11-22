import React, { useState, useEffect } from 'react';
import { Vega } from 'react-vega';
import axios from 'axios';
import '../node_modules/react-vis/dist/style.css';
import MarginChart from './MarginChart.js'
import ProportionBar from './ProportionBar.js'
import PacTable from './PacTable.js'
import RaceSelect from './RaceSelect.js'
import NetworkSplit from './NetworkSplit.js'
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
	'Prop 126',
	'Impeachment',
	'Tax Returns',
	'GOTV',
	'Red for Ed'
   ]

const partisanColors = {'Democrat': '#2580db', 'Republican': '#990033'}
const colors = ['green', 'purple', 'orange'];

const startingQuery = {
	xaxis: "week",
	yaxis: "count",
	color: "p.name",
	race: "Senate",
	cycle: "2018"
}

function App() {
	const [adData, setAdData] = useState({ad: [], pac: [], sides: []});
	const [adQuery, setAdQuery] = useState(startingQuery);
	useEffect(() => { // Get starting chart data.
		axios.get(process.env.REACT_APP_GET_ADDATA+'/race', {params: adQuery}) 
		.then(function (response) {
			console.log("api response")
			console.log(response.data)
			var sides = [];
			response.data.weekresults.forEach(ad=>{
				if (sides.indexOf(ad.side) == -1){
					sides.push(ad.side);
				}
			})
			sides = sides.sort()
			sides = sides.map(s=>{
				return {short: s.slice(0,1), long: s, color: s in partisanColors ? partisanColors[s]: colors[sides.indexOf(s)]}
			})
			setAdData({pac: response.data.pacresults.rows, ad: response.data.weekresults, sides: sides})
		})
	}, [adQuery]);
	return (
		<Grommet full theme={generate(20, 5)}>
		    <Grid fill rows={["flex"]} columns={["2/3", "1/3"]} areas={[
              ["table", "charts"],
              ['footer', 'footer']
            ]}
          >
            <PacTable adData={adData} race={adQuery.race}
			onRaceSelect={(option) =>{ adQuery.race = option; setAdQuery(JSON.parse(JSON.stringify(adQuery))); }}
			> </PacTable>
            <DashFooter sides={adData.sides}> </DashFooter>
            <Box gridArea="charts" direction="column" pad={{ horizontal: "small", top:"4px" }} fill>
            	<Table> 
            		<TableHeader  className="noLeftPad">
            			<TableRow className="noLeftPad">
            				<TableCell className="noLeftPad" size="flex" fill> <br /> Side Comparison </TableCell>
            				<TableCell size="flex">
	    						<RaceSelect options={availableRaces} value={adQuery.race} onChange={(option) =>{ adQuery.race = option; setAdQuery(JSON.parse(JSON.stringify(adQuery))); }}> </RaceSelect>
            				</TableCell>
            			</TableRow>
            		</TableHeader>
            	</Table>
            	<Box className="gridBox">
			    <Grid fill rows={["flex", "flex", "flex"]}  areas={[
	              ["chart1"],
	              ["chart2"],
	              ["chart3"]
	            ]}>
    	         <MarginChart adData={adData.ad} sides={adData.sides}> </MarginChart>
    	         <ProportionBar adData={adData.ad} sides={adData.sides}> </ProportionBar>
    	         <NetworkSplit adData={adData.ad} sides={adData.sides}> </NetworkSplit>
                </Grid>
                </Box>
             </Box>
          </Grid>
		</Grommet>
	);
}
/* 			
 <ControlPanel changeQuery={updateQuery} />
 #signalListeners={signalListeners}
*/
export default App;
