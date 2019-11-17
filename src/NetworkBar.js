import './App.css';
import React, { useState, useEffect, useRef } from 'react';
import { Sparklines } from 'react-sparklines';

const keys = ['ABC', 'CBS', 'FOX', 'NBC', 'Other']

var NetworkBar = function (props) {
	const [barData, setBarData] = useState([])
	const [barColors, setBarColors] = useState([])
	useEffect(()=>{ // Calculate totals for each network, then proportions of buy.
		var bd = props.buyData;
		var networkTotals = []
		var buyTotal = 0
		keys.forEach(k=>{
			let networkBuys = k!='Other' ? bd.filter(el=>k==el.network) :  bd.filter(el=>keys.indexOf(el.network)==-1)
			var networkTotal = 0
			networkBuys.forEach(n=>{
				networkTotal = networkTotal+n.cost
			})
			networkTotals.push(networkTotal)
			buyTotal = buyTotal + networkTotal
		})
		networkTotals = networkTotals.map(n=>n/buyTotal)
		setBarData(networkTotals)
	}, [props.buyData])
	return (
		<Sparklines data={barData} limit={5} max={1} min={0} height={40} >
		    <SparklinesBars color="#0a83d8"  />
		</Sparklines>
    )
}
// style={ { fill:  barColors[p.y] } } 

class SparklinesBars extends React.Component {
  static defaultProps = {
    style: { fill: 'slategray' },
    dataColors: ['red', 'blue', 'yellow', 'green', 'purple']
  };

  render() {
    const { points, height, style, barWidth, width, margin, onMouseMove, data, dataColors } = this.props;
    const strokeWidth = 1 * ((style && style.strokeWidth) || 0);
    const marginWidth = margin ? 2 * margin : 0;
    const widthBar =
      barWidth ||
      (points && points.length >= 2
        ? width/points.length
        : 0);
    return (
      <g transform="scale(1,-1)">
        {points.map((p, i) =>
          <rect
            key={i}
            x={i*widthBar}
            y={-height}
            width={widthBar}
            height={Math.max(0, height - p.y)}
            style={{fill: this.props.dataColors[i]}}
            onMouseMove={onMouseMove && onMouseMove.bind(this, p)}
          />,
        )}
      </g>
    );
  }
}


export default NetworkBar