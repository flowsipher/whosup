import './App.css';
import React from 'react';
import {  Box, Text, 
	Table,
	TableCell,
	TableRow,
	TableFooter
} from 'grommet';
import { deepMerge } from "grommet/utils";
import { Run, Money, base } from 'grommet-icons';

const iconTheme = deepMerge(base, {
  	icon: {
  		size: { medium: '18px'} 
  	},
  	extend: {
  		top: '.125em'
  	}
})

var DashFooter = function (props) {
	const sideKeys = props.sides.map((s)=><Box direction="row" key={s.long} align="center">
		<nav className="bd-color" style={{background: s.color}}></nav>
		<Text className="legendItem"> 
			 - {s.long}
		</Text> </Box>
	) 
	return (
		<Box gridArea="footer" direction="row" pad={{ horizontal: "small" }}>
	    	<Table className="dashFooter">
	        	<TableFooter>
	            	<TableRow>
		            	<TableCell>
			            	<Box direction="row" align="center" fill>
			            		<span className="legendItem">
			            			<Money size="medium" theme={iconTheme} className="svgIcon" /> - IE
			            		</span>
			            		<span className="legendItem">
			            			<Run size="medium" theme={iconTheme} className="svgIcon" /> - Candidate
			            		</span>
			            		<Box direction="row" align="center">
			            			{sideKeys}
			            		</Box>
								<span style={{marginLeft:'auto'}}>
								 Want to explore yourself? Get the data <a href="https://github.com/flowsipher/FCCAdData">here.</a>
								</span>
			            	</Box>
		            	</TableCell>
	            	</TableRow>
	        	</TableFooter> 
	    	</Table>
	    </Box>
    )
}

export default DashFooter




/*
		            	<TableCell>
		            		<span className="legendItem">
		            			<StatusInfoSmall color="red" size="medium" theme={iconTheme} className="svgIcon"/> - ABC
		            		</span>
		            		<span className="legendItem">
		            			<StatusInfoSmall color="blue" size="medium" theme={iconTheme} className="svgIcon"/> - CBS
		            		</span>
		            		<span className="legendItem">
		            			<StatusInfoSmall color="yellow" size="medium" theme={iconTheme} className="svgIcon"/> - FOX
		            		</span>
		            		<span className="legendItem">
		            			<StatusInfoSmall color="green" size="medium" theme={iconTheme} className="svgIcon"/> - NBC
		            		</span>
		            		<span className="legendItem">
		            			<StatusInfoSmall color="purple" size="medium" theme={iconTheme} className="svgIcon"/> - Other
		            		</span>
		            	</TableCell>
*/