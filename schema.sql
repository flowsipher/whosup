CREATE TABLE stations(
	id serial primary key,
	sign text,
	network text,
	medium text,
	state text,
	dma text,
	channel text
);

CREATE TABLE pacs(
	id serial primary key,
	name text,
	juris text,
	side text,
	cycle text,
	district text,
	race text
);

CREATE TABLE ads (
 id serial primary key,
 stationid int references stations(id),
 pacid int references pacs(id),
 airdate date,
 cycle int, 
 rate real,
 program text
);


COPY stations(sign, state, network, dma, channel, id, medium) FROM '/home/andrew/Documents/PredictiveModeling/TV/stationsPhoenixdma.csv' DELIMITER ',' CSV HEADER;

COPY pacs(cycle, district, juris, name, side, race, id) FROM '/home/andrew/Documents/PredictiveModeling/TV/comsupload.csv' DELIMITER ',' CSV HEADER;

COPY ads(airdate, program, rate, cycle, pacid, stationid) FROM '/home/andrew/Documents/PredictiveModeling/TV/adsupload.csv' DELIMITER ',' CSV HEADER;

