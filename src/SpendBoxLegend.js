import './App.css';
import React, { useState, useEffect, useRef } from 'react';
import { Boxplot } from 'react-boxplot'
import { ticks } from 'd3-array'
import { format } from 'd3-format'

var SpendBoxLegend = function (props) {
	var horizScaleFactor = 200 / (props.dimensions[1] - 0);
	var transforms = ["translate (".concat(-0, ", 0) "), "translate (0, ".concat(15, ") ")];
	var tickVals = ticks(0, props.dimensions[1], 4)
	return (
		<svg width="200px" height="20px" >
			<g transform={transforms.join(' ')}>
				{tickVals.map(t=>{
					return (<text x={t*horizScaleFactor} y={0} style={{fill: "#919eab", fontSize: '15px',
			fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", "Roboto", "Oxygen", "Ubuntu", "Cantarell", "Fira Sans", "Droid Sans", "Helvetica Neue", sans-serif'
							}} key={t}>
						{format('$.1s')(t)}
					</text>)
				})}
			</g>
		</svg>
    )
}

export default SpendBoxLegend