import './App.css';
import React, { useState, useEffect, useRef } from 'react';
import { Grommet, Box, Button, Grid, Text, Select, ThemeContext, DataTable, generate,
	Table,
	TableCell,
	TableHeader,
	TableRow,
	TableFooter
} from 'grommet';
import * as moment from 'moment';
import { deepMerge } from "grommet/utils";
import { Run, Money, base, StatusInfoSmall } from 'grommet-icons';

const iconTheme = deepMerge(base, {
  	icon: {
  		size: { medium: '18px'} 
  	},
  	extend: {
  		top: '.125em'
  	}
})

var DashFooter = function (props) {
	const sideKeys = props.sides.map((s)=>
		<span className="legendItem"> 
			<b style={{color: s.color}}> {s.short}</b> - {s.long}
		</span>
	) 
	return (
		<Box gridArea="footer" direction="row" pad={{ horizontal: "small" }}>
	    	<Table className="dashFooter">
	        	<TableFooter>
	            	<TableRow>
		            	<TableCell>
		            		<span className="legendItem">
		            			<Money size="medium" theme={iconTheme} className="svgIcon" /> - IE
		            		</span>
		            		<span className="legendItem">
		            			<Run size="medium" theme={iconTheme} className="svgIcon" /> - Candidate
		            		</span>
		            	</TableCell>
		            	<TableCell>
		            		{sideKeys}
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