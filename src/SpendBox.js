import './App.css';
import React, { useState, useEffect, useRef } from 'react';
import { Boxplot } from 'react-boxplot'
var SpendBox = function (props) {
	console.log(props.dimensions[1]-29500)
	return (
		<Boxplot
			width={220}
			height={25}
			orientation="horizontal"
			min={props.dimensions[0]}
			max={props.dimensions[1]-27500}
			stats={props.boxData}
			whiskerStyle={{stroke: props.color}}
			boxStyle={{stroke: props.color, fill: props.color}}
			tickStyle={{stroke: props.color}}
		/>
    )
}

export default SpendBox