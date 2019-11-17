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
			<SparklinesLine style={{ fill: "none", strokeWidth: 7}} />
			<SparklinesSpots size={10} spotColors={{'1':'black'}} />
		</Sparklines>
    )
}

export default SpendSpark