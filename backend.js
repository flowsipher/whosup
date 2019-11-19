const express = require('express')
require('dotenv').config()
var path = require('path');
const app = express()
const port = 4000
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var pg = require('pg').defaults.parseInt8 = true

let test = {'test': 'fuck'}
console.log(test['oasndsaj'])

//Logger, standard stuff.
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static('site'));

app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});

// Database
const cn = {
    host: process.env.DATABASE_URL,
    port: process.env.DBPORT,
    database: process.env.APPDB,
    user: process.env.DBUSER,
    password: process.env.PASS
};
var knex = require('knex')({
  client: 'pg',
  connection: cn
});

app.listen(port, () => console.log(`Backend listening on port ${port}!`))

app.get('/race', (req, res) => {
	var axes = {x: null, y: null}
	const validKeys = ['race','cycle','yaxis', 'xaxis', 'color', 'juris']
	query = knex.from('ads as a')
				.leftJoin('stations as s', 'a.stationid', 's.id')
				.leftJoin('pacs as p', 'a.pacid', 'p.id')
				.select('p.side').groupBy('p.side')
				.select('p.juris').groupBy('p.juris')
				.select('s.network').groupBy('s.network')
	Object.keys(req.query).forEach(k=>{
		if(validKeys.indexOf(k) !== -1){
			switch(k){
				case 'juris':
					if(req.query[k] == 'hard'){
						query.where('p.juris', '!=', 'Non-Candidate Issue Ads')
					} else {
						query.where('p.juris', 'Non-Candidate Issue Ads')
					}
				break;
				case 'color':
					query.groupBy(req.query[k]).select(req.query[k])
				break;
				case 'yaxis':
					query.sum("a.rate as cost")
					query.count('a.id as ads')
				break;
				case 'xaxis':
					switch(req.query[k]){
						case 'week':
							query.select(knex.raw("to_date(TO_CHAR(DATE_TRUNC('week', airdate), 'YYYYWW'), 'yyyyww') as week")).groupBy('week')
						break;
						case 'day':
							query.select(knex.raw("TO_CHAR(airdate, 'MM/DD') as day")).groupBy('day')
						break;
						case 'month':
							query.select(knex.raw("TO_CHAR(airdate, 'MM/YY') as month")).groupBy('month')
						break;
					}
				break;
				case 'dma':

				break;
				case 'medium':

				break;
				case 'cycle':
					query.where('p.cycle', req.query[k])
				break;
				case 'race':
					query.where('p.race', req.query[k])
				break;
			}
		}
	})
	console.log('query start')
	query.on( 'query', function( queryData ) {
	    console.log( queryData.sql );
      	console.log( queryData.bindings );
	}).then((weekresults)=>{
		knex.raw('select p.name, percentile_cont(.25) WITHIN GROUP (order by a.rate) as quartile1, percentile_cont(.5) WITHIN GROUP (order by a.rate) as quartile2, percentile_cont(.75) WITHIN GROUP (order by a.rate) as quartile3, min(a.rate) as whiskerLow, max(a.rate) as whiskerHigh from ads a, pacs p where a.pacid = p.id and p.race = ? and p.cycle = ? group by p.name', [req.query.race, req.query.cycle]).then((pacresults)=>{
			res.json({weekresults: weekresults, pacresults: pacresults})
		})
	})
})


//to_date('201643', 'iyyyiw')
//TO WEEK OF to_date(TO_CHAR(DATE_TRUNC('week', airdate), 'YYYYWW'), 'yyyyww') from ads limit 1;

