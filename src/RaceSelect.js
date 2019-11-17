import './App.css';
import React, { useState, useEffect, useRef } from 'react';
import { Sparklines, SparklinesLine, SparklinesSpots } from 'react-sparklines';
import { Grommet, Box, Button, Grid, Text, Select, ThemeContext, DataTable, Heading, DropButton} from 'grommet';
import * as moment from 'moment';
var RaceSelect = function (props) {
	const [dropdown, setDropdown] = useState(false)
	const options = props.options.map((o)=> 
		<span onClick={()=>{props.onChange(o)}} key={o} className='raceSelectDropownButton'>{o}</span>
	)
	return (
		<DropButton
		    dropContent={<div className="raceSelectDropdown"> {options} </div>}
		    dropProps={{ align: { top: "bottom" } }}
		  >
		  <span className="raceSelect"> {props.value} </span>
		</DropButton>
    )
}

export default RaceSelect