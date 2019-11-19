import './App.css';
import React, { useState, useEffect, useRef } from 'react';
import { Sparklines, SparklinesLine, SparklinesSpots } from 'react-sparklines';
import * as moment from 'moment';
var SpendSpark = function (props) {
	const [sparkData, setSparkData] = useState([])
	useEffect(()=>{
		let sparkPoints = []
		props.timeline.ints.forEach(t=>{
			let intervalBuys = props.buyData.filter(b=>moment(b.week).isBetween(t[0], t[1]))
			sparkPoints.push(intervalBuys.reduce((acc,val)=>{return acc+val.ads;},0))
		})
		setSparkData(sparkPoints)
	}, [props.buyData, props.timeline])
	return (
		<Sparklines data={sparkData} margin={10} className="bentest" >
			<SparklinesLine style={{ fill: "none", strokeWidth: 4}} color={props.color} />
			<SparklinesSpots size={6} spotColors={{'1':props.color, '0': props.color, '-1': props.color}} />
		</Sparklines>
    )
}

export default SpendSpark