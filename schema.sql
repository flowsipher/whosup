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
 program text,
 airtime text
);


\COPY stations(sign, state, network, dma, channel, id, medium) FROM '/media/andrew/F08C9B848C9B444E/analysis/tv/fccscraper/results/stationsPhoenixdma.csv' DELIMITER ',' CSV HEADER;

\COPY pacs(cycle, district, juris, name, side, race, id) FROM '/media/andrew/F08C9B848C9B444E/analysis/tv/fccscraper/results/comsupload.csv' DELIMITER ',' CSV HEADER;

\COPY ads(airdate, rate, program, cycle, airtime, pacid, stationid) FROM '/media/andrew/F08C9B848C9B444E/analysis/tv/fccscraper/results/adsupload.csv' DELIMITER ',' CSV HEADER;
