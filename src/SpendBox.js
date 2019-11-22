import './App.css';
import React, { useState, useEffect, useRef } from 'react';
import { Boxplot } from 'react-boxplot'
var SpendBox = function (props) {
	return (
		<Boxplot
			width={200}
			height={20}
			orientation="horizontal"
			min={0}
			max={props.dimensions[1]}
			stats={props.boxData}
			whiskerStyle={{stroke: props.color}}
			boxStyle={{stroke: props.color, fill: props.color}}
			tickStyle={{stroke: props.color}}
		/>
    )
}

export default SpendBox