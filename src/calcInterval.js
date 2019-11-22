import * as moment from 'moment';

export default function calculateIntervals(timeline){
	let lengthOfElection=((timeline.end-timeline.start)/86400000)
	let intervalConfig = {}
	if(lengthOfElection>=180){ // Bi-monthly
		intervalConfig['unit'] = 'month';
		intervalConfig['change'] = 2
	}
	if(lengthOfElection>=84 && lengthOfElection<=180){ // Monthly
		intervalConfig['unit'] = 'month';
		intervalConfig['change'] = 1
	}
	if(lengthOfElection>=42 && lengthOfElection<=84){ // Bi-weekly
		intervalConfig['unit'] = 'week';
		intervalConfig['change'] = 2
	}
	if(lengthOfElection<=42){ // Week
		intervalConfig['unit'] = 'week';
		intervalConfig['change'] = 1
	}
	// Calculate sparkline intervals.
	let intervals = []
	let curDate = moment(timeline.start).startOf(intervalConfig['unit'])
	let addUnit = intervalConfig['unit'] =='month' ? 'M':'w'
	while(curDate<moment(timeline.end).startOf(intervalConfig['unit'])){
		intervals.push([curDate.clone(), curDate.clone().add(intervalConfig['change'], addUnit)])
		curDate = curDate.add(intervalConfig['change'], addUnit)
	}
	return {ints: intervals, unit: intervalConfig.unit, change: intervalConfig.change};
}