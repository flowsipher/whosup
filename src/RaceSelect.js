import './App.css';
import React, { useState } from 'react';
import { DropButton} from 'grommet';
import { FormDown } from 'grommet-icons';
var RaceSelect = function (props) {
	const options = props.options.map((o)=> 
		<span onClick={()=>{props.onChange(o)}} key={o} className='raceSelectDropownButton'>{o}</span>
	)
	return (
		<DropButton
		    dropContent={<div className="raceSelectDropdown"> {options} </div>}
		    dropProps={{ align: { top: "bottom" } }}
		    style={{float: "right"}}
		  >
		  	<span className="raceSelect">
		  	    {props.value}
		  	   <FormDown color="brand" />
		  	 </span>
		</DropButton>
    )
}

export default RaceSelect