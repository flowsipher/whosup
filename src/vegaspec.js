export default {
  "$schema": "https://vega.github.io/schema/vega/v5.json",
  "autosize": {"type": "fit", "resize": true},
  "padding": {"left": 5, "top": 12, "right": 5, "bottom": 0},
  "signals": [
    { "name": "chartHeight", "update": "containerSize()[1]/2-(chartPad+20)" },
    { "name": "chartPad", "value": 40 },
    { "name": "height", "update": "containerSize()[1]-40" },
    { "name": "width", "update": "containerSize()[0]-50" },
    {
      "name": "legendHover",
      "value": {},
      "on": [
        {"events": "@legendSymbol:mouseover, @legendLabel:mouseover", "update": "datum"},
        {"events": "@legendSymbol:mouseout, @legendLabel:mouseout", "update": "{}"}
      ]
    },
    {
      "name": "Race",
      "value": "Senate",
      "bind": {"input": "select", "options": ["Senate", "Governor"], "name": " "}
    },
    {
      "name": "X:",
      "value": "week",
      "bind": {"input": "select", "options": ["Day", "Week", "Month"]}
    },
    {
      "name": "Y:",
      "value": "ads",
      "bind": {"input": "select", "options": ["Ads", "$"]}
    },
    {
      "name": "Color:",
      "value": "PAC",
      "bind": {"input": "select", "options": ["PAC", "Hard/Soft", "Station", "DMA", "Medium"]}
    }
  ],
  "data": [
    {
      "name": "table",
      "values": [{"side":"Democrat","week":"2018-10-08T07:00:00.000Z","ads":671,"name":"AFSCME People Pac"},{"side":"Democrat","week":"2018-10-29T07:00:00.000Z","ads":2165,"name":"MAJORITY FORWARD VOTE VETS ACTION FUND"},{"side":"Democrat","week":"2018-09-24T07:00:00.000Z","ads":62,"name":"WOMEN VOTE"},{"side":"Democrat","week":"2018-04-09T07:00:00.000Z","ads":406,"name":"Kyrsten Sinema"},{"side":"Democrat","week":"2018-08-13T07:00:00.000Z","ads":663,"name":"Red and Gold"},{"side":"Republican","week":"2018-09-17T07:00:00.000Z","ads":377,"name":"Defend ARIZONA"},{"side":"Republican","week":"2018-09-03T07:00:00.000Z","ads":909,"name":"NRSC"},{"side":"Democrat","week":"2018-08-20T07:00:00.000Z","ads":40,"name":"Red and Gold"},{"side":"Republican","week":"2018-09-03T07:00:00.000Z","ads":88,"name":"One Nation"},{"side":"Democrat","week":"2018-04-16T07:00:00.000Z","ads":413,"name":"Kyrsten Sinema"},{"side":"Democrat","week":"2018-10-15T07:00:00.000Z","ads":22,"name":"AFSCME People Pac"},{"side":"Republican","week":"2018-09-03T07:00:00.000Z","ads":294,"name":"McSally"},{"side":"Republican","week":"2018-07-30T07:00:00.000Z","ads":110,"name":"Defend ARIZONA"},{"side":"Democrat","week":"2018-09-24T07:00:00.000Z","ads":801,"name":"Kyrsten Sinema"},{"side":"Democrat","week":"2018-10-22T07:00:00.000Z","ads":1696,"name":"MAJORITY FORWARD VOTE VETS ACTION FUND"},{"side":"Democrat","week":"2018-09-10T07:00:00.000Z","ads":861,"name":"Kyrsten Sinema"},{"side":"Republican","week":"2018-10-15T07:00:00.000Z","ads":1245,"name":"Defend ARIZONA"},{"side":"Republican","week":"2018-11-05T07:00:00.000Z","ads":222,"name":"Defend ARIZONA"},{"side":"Democrat","week":"2018-10-22T07:00:00.000Z","ads":143,"name":"Senate Majority"},{"side":"Republican","week":"2018-10-08T07:00:00.000Z","ads":1161,"name":"Defend ARIZONA"},{"side":"Democrat","week":"2018-09-03T07:00:00.000Z","ads":671,"name":"Kyrsten Sinema"},{"side":"Democrat","week":"2018-05-21T07:00:00.000Z","ads":242,"name":"Kyrsten Sinema"},{"side":"Democrat","week":"2018-10-29T07:00:00.000Z","ads":7,"name":"Senate Majority"},{"side":"Democrat","week":"2018-08-06T07:00:00.000Z","ads":1800,"name":"Red and Gold"},{"side":"Republican","week":"2018-09-24T07:00:00.000Z","ads":364,"name":"McSally"},{"side":"Democrat","week":"2018-10-01T07:00:00.000Z","ads":729,"name":"DSCC"},{"side":"Republican","week":"2018-09-10T07:00:00.000Z","ads":1131,"name":"NRSC"},{"side":"Republican","week":"2018-09-24T07:00:00.000Z","ads":1200,"name":"NRSC"},{"side":"Republican","week":"2018-09-10T07:00:00.000Z","ads":465,"name":"McSally"},{"side":"Democrat","week":"2018-10-22T07:00:00.000Z","ads":1165,"name":"Kyrsten Sinema"},{"side":"Democrat","week":"2018-10-15T07:00:00.000Z","ads":486,"name":"US Chamber of Commerce"},{"side":"Republican","week":"2018-08-06T07:00:00.000Z","ads":531,"name":"McSally"},{"side":"Democrat","week":"2018-10-29T07:00:00.000Z","ads":114,"name":"WOMEN VOTE"},{"side":"Democrat","week":"2018-09-24T07:00:00.000Z","ads":2282,"name":"MAJORITY FORWARD VOTE VETS ACTION FUND"},{"side":"Democrat","week":"2018-09-10T07:00:00.000Z","ads":2517,"name":"MAJORITY FORWARD VOTE VETS ACTION FUND"},{"side":"Democrat","week":"2018-06-04T07:00:00.000Z","ads":304,"name":"Kyrsten Sinema"},{"side":"Republican","week":"2018-06-11T07:00:00.000Z","ads":154,"name":"One Nation"},{"side":"Republican","week":"2018-07-23T07:00:00.000Z","ads":84,"name":"One Nation"},{"side":"Republican","week":"2018-10-01T07:00:00.000Z","ads":993,"name":"Defend ARIZONA"},{"side":"Democrat","week":"2018-10-08T07:00:00.000Z","ads":87,"name":"US Chamber of Commerce"},{"side":"Democrat","week":"2018-08-13T07:00:00.000Z","ads":267,"name":"Kyrsten Sinema"},{"side":"Democrat","week":"2018-11-05T07:00:00.000Z","ads":10,"name":"DSCC"},{"side":"Democrat","week":"2018-05-28T07:00:00.000Z","ads":228,"name":"Kyrsten Sinema"},{"side":"Democrat","week":"2018-10-15T07:00:00.000Z","ads":978,"name":"DSCC"},{"side":"Democrat","week":"2018-10-08T07:00:00.000Z","ads":1261,"name":"DSCC"},{"side":"Democrat","week":"2018-10-22T07:00:00.000Z","ads":105,"name":"WOMEN VOTE"},{"side":"Democrat","week":"2018-07-30T07:00:00.000Z","ads":45,"name":"American Civil Liberties Union Inc   ACLU "},{"side":"Democrat","week":"2018-08-20T07:00:00.000Z","ads":265,"name":"Kyrsten Sinema"},{"side":"Democrat","week":"2018-10-29T07:00:00.000Z","ads":1389,"name":"Kyrsten Sinema"},{"side":"Republican","week":"2018-08-27T07:00:00.000Z","ads":42,"name":"Defend ARIZONA"},{"side":"Republican","week":"2018-10-22T07:00:00.000Z","ads":646,"name":"McSally"},{"side":"Democrat","week":"2018-08-06T07:00:00.000Z","ads":292,"name":"Kyrsten Sinema"},{"side":"Democrat","week":"2018-05-14T07:00:00.000Z","ads":564,"name":"Patriot Majority"},{"side":"Democrat","week":"2018-07-23T07:00:00.000Z","ads":82,"name":"American Civil Liberties Union ARIZONA"},{"side":"Democrat","week":"2018-06-11T07:00:00.000Z","ads":296,"name":"Kyrsten Sinema"},{"side":"Republican","week":"2018-10-22T07:00:00.000Z","ads":222,"name":"NRSC"},{"side":"Democrat","week":"2018-07-23T07:00:00.000Z","ads":312,"name":"Kyrsten Sinema"},{"side":"Republican","week":"2018-08-13T07:00:00.000Z","ads":471,"name":"McSally"},{"side":"Democrat","week":"2018-09-17T07:00:00.000Z","ads":725,"name":"DSCC"},{"side":"Democrat","week":"2018-09-03T07:00:00.000Z","ads":1200,"name":"MAJORITY FORWARD VOTE VETS ACTION FUND"},{"side":"Democrat","week":"2018-04-23T07:00:00.000Z","ads":394,"name":"Kyrsten Sinema"},{"side":"Republican","week":"2018-10-29T07:00:00.000Z","ads":546,"name":"McSally"},{"side":"Republican","week":"2018-08-20T07:00:00.000Z","ads":677,"name":"McSally"},{"side":"Democrat","week":"2018-10-08T07:00:00.000Z","ads":1105,"name":"Kyrsten Sinema"},{"side":"Republican","week":"2018-07-16T07:00:00.000Z","ads":216,"name":"One Nation"},{"side":"Democrat","week":"2018-10-29T07:00:00.000Z","ads":1153,"name":"DSCC"},{"side":"Democrat","week":"2018-10-01T07:00:00.000Z","ads":6,"name":"Senate Majority"},{"side":"Democrat","week":"2018-11-05T07:00:00.000Z","ads":313,"name":"Kyrsten Sinema"},{"side":"Republican","week":"2018-09-17T07:00:00.000Z","ads":309,"name":"McSally"},{"side":"Republican","week":"2018-09-17T07:00:00.000Z","ads":1008,"name":"NRSC"},{"side":"Democrat","week":"2018-10-15T07:00:00.000Z","ads":1072,"name":"Kyrsten Sinema"},{"side":"Democrat","week":"2018-07-23T07:00:00.000Z","ads":45,"name":"American Civil Liberties Union Inc   ACLU "},{"side":"Republican","week":"2018-10-01T07:00:00.000Z","ads":116,"name":"Arizona Republican Party"},{"side":"Democrat","week":"2018-10-22T07:00:00.000Z","ads":145,"name":"US Chamber of Commerce"},{"side":"Democrat","week":"2018-10-15T07:00:00.000Z","ads":75,"name":"WOMEN VOTE"},{"side":"Republican","week":"2018-06-18T07:00:00.000Z","ads":186,"name":"One Nation"},{"side":"Republican","week":"2018-06-25T07:00:00.000Z","ads":16,"name":"One Nation"},{"side":"Republican","week":"2018-07-30T07:00:00.000Z","ads":327,"name":"McSally"},{"side":"Democrat","week":"2018-05-28T07:00:00.000Z","ads":276,"name":"Patriot Majority"},{"side":"Democrat","week":"2018-10-22T07:00:00.000Z","ads":1515,"name":"DSCC"},{"side":"Democrat","week":"2018-10-08T07:00:00.000Z","ads":75,"name":"WOMEN VOTE"},{"side":"Democrat","week":"2018-07-16T07:00:00.000Z","ads":240,"name":"Kyrsten Sinema"},{"side":"Republican","week":"2018-10-08T07:00:00.000Z","ads":471,"name":"McSally"},{"side":"Republican","week":"2018-10-08T07:00:00.000Z","ads":923,"name":"NRSC"},{"side":"Republican","week":"2018-11-05T07:00:00.000Z","ads":17,"name":"McSally"},{"side":"Republican","week":"2018-10-15T07:00:00.000Z","ads":609,"name":"NRSC"},{"side":"Democrat","week":"2018-09-17T07:00:00.000Z","ads":900,"name":"Kyrsten Sinema"},{"side":"Democrat","week":"2018-08-27T07:00:00.000Z","ads":501,"name":"MAJORITY FORWARD VOTE VETS ACTION FUND"},{"side":"Democrat","week":"2018-05-14T07:00:00.000Z","ads":386,"name":"Kyrsten Sinema"},{"side":"Republican","week":"2018-10-15T07:00:00.000Z","ads":577,"name":"McSally"},{"side":"Democrat","week":"2018-06-25T07:00:00.000Z","ads":254,"name":"Kyrsten Sinema"},{"side":"Republican","week":"2018-09-10T07:00:00.000Z","ads":619,"name":"Defend ARIZONA"},{"side":"Democrat","week":"2018-06-18T07:00:00.000Z","ads":318,"name":"Kyrsten Sinema"},{"side":"Democrat","week":"2018-07-30T07:00:00.000Z","ads":82,"name":"American Civil Liberties Union ARIZONA"},{"side":"Republican","week":"2018-09-24T07:00:00.000Z","ads":615,"name":"Defend ARIZONA"},{"side":"Democrat","week":"2018-07-30T07:00:00.000Z","ads":271,"name":"Kyrsten Sinema"},{"side":"Democrat","week":"2018-10-01T07:00:00.000Z","ads":682,"name":"MAJORITY FORWARD VOTE VETS ACTION FUND"},{"side":"Democrat","week":"2018-04-30T07:00:00.000Z","ads":409,"name":"Kyrsten Sinema"},{"side":"Republican","week":"2018-10-01T07:00:00.000Z","ads":383,"name":"McSally"},{"side":"Democrat","week":"2018-09-24T07:00:00.000Z","ads":981,"name":"DSCC"},{"side":"Republican","week":"2018-10-01T07:00:00.000Z","ads":959,"name":"NRSC"},{"side":"Democrat","week":"2018-05-07T07:00:00.000Z","ads":366,"name":"Kyrsten Sinema"},{"side":"Republican","week":"2018-08-06T07:00:00.000Z","ads":442,"name":"Defend ARIZONA"},{"side":"Republican","week":"2018-08-27T07:00:00.000Z","ads":194,"name":"McSally"},{"side":"Republican","week":"2018-08-27T07:00:00.000Z","ads":206,"name":"One Nation"},{"side":"Democrat","week":"2018-11-05T07:00:00.000Z","ads":114,"name":"MAJORITY FORWARD VOTE VETS ACTION FUND"},{"side":"Democrat","week":"2018-10-15T07:00:00.000Z","ads":2652,"name":"MAJORITY FORWARD VOTE VETS ACTION FUND"},{"side":"Republican","week":"2018-07-02T07:00:00.000Z","ads":114,"name":"One Nation"},{"side":"Democrat","week":"2018-10-08T07:00:00.000Z","ads":32,"name":"MAJORITY FORWARD VOTE VETS ACTION FUND"},{"side":"Democrat","week":"2018-07-09T07:00:00.000Z","ads":283,"name":"Kyrsten Sinema"},{"side":"Republican","week":"2018-10-15T07:00:00.000Z","ads":190,"name":"Arizona Republican Party"},{"side":"Democrat","week":"2018-10-01T07:00:00.000Z","ads":1088,"name":"Kyrsten Sinema"},{"side":"Democrat","week":"2018-10-15T07:00:00.000Z","ads":7,"name":"Senate Majority"},{"side":"Democrat","week":"2018-10-08T07:00:00.000Z","ads":208,"name":"Senate Majority"},{"side":"Democrat","week":"2018-07-30T07:00:00.000Z","ads":1097,"name":"Red and Gold"},{"side":"Republican","week":"2018-10-08T07:00:00.000Z","ads":330,"name":"Arizona Republican Party"},{"side":"Republican","week":"2018-10-22T07:00:00.000Z","ads":1398,"name":"Defend ARIZONA"},{"side":"Republican","week":"2018-08-20T07:00:00.000Z","ads":674,"name":"Defend ARIZONA"},{"side":"Democrat","week":"2018-08-27T07:00:00.000Z","ads":550,"name":"Kyrsten Sinema"},{"side":"Republican","week":"2018-10-29T07:00:00.000Z","ads":1145,"name":"Defend ARIZONA"},{"side":"Democrat","week":"2018-09-17T07:00:00.000Z","ads":2260,"name":"MAJORITY FORWARD VOTE VETS ACTION FUND"},{"side":"Democrat","week":"2018-07-02T07:00:00.000Z","ads":6,"name":"Kyrsten Sinema"},{"side":"Republican","week":"2018-07-09T07:00:00.000Z","ads":194,"name":"One Nation"},{"side":"Republican","week":"2018-08-13T07:00:00.000Z","ads":1026,"name":"Defend ARIZONA"},{"side":"Democrat","week":"2018-10-01T07:00:00.000Z","ads":71,"name":"WOMEN VOTE"},{"side":"Democrat","week":"2018-05-21T07:00:00.000Z","ads":421,"name":"Patriot Majority"}],
      "transform": [
        {
         "type": "formula",
         "as": "weekstart",
         "expr": "timeFormat(datetime(datum.week), '%m/%d')"
        },
        {
          "type": "stack",
          "groupby": ["week", "side"],
          "sort": {"field": "name"},
          "field": "ads"
        }
      ]
    },
    {
      "name": "top",
      "source": "table",
      "transform": [
        {"type": "filter", "expr": "datum.side == 'Democrat'"}
      ]
    },
    {
      "name": "bottom",
      "source": "table",
      "transform": [
        {"type": "filter", "expr": "datum.side == 'Republican'"}
      ]
    },
    
    {
      "name": "xaxis",
      "source": "table",
      "transform": [
        {"type": "pivot", "groupby": ["weekstart"], "field": "side", "value": "ads"},
        {"type": "formula", "as": "margin", "expr": "datum['Democrat'] - datum['Republican']"}
      ]
    },
    {
      "name": "sidetotals",
      "source": "table",
      "transform": [
        {"type": "aggregate", "groupby": ["side"], "ops": ["sum"], "fields": ["ads"], "as":["sum"]},
        {"type": "formula", "as": "mergecol", "expr": "'merge'"},
        {"type": "pivot", "groupby": ["mergecol"], "field": "side", "value": "sum"}
      ]
    },
    {
      "name": "topgrouptotals",
      "source": "top",
      "transform": [
        {"type": "aggregate", "groupby": ["name"], "ops": ["sum"], "fields": ["ads"], "as":["sum"]},
        {"type": "collect", "sort": {"field": "sum",  "order": "descending"} }
      ]
    },
    {
      "name": "bottomgrouptotals",
      "source": "bottom",
      "transform": [
        {"type": "aggregate", "groupby": ["name"], "ops": ["sum"], "fields": ["ads"], "as":["sum"]},
        {"type": "collect", "sort": {"field": "sum",  "order": "descending"} }
      ]
    }
  ],
  "scales": [
    {
      "name": "x",
      "type": "band",
      "range": [{"signal": "width"}, 0],
      "round": true,
      "domain": {"data": "table", "field": "weekstart", "sort": {"order": "descending"}}
    },
    {
      "name": "ctop",
      "type": "ordinal",
      "domain": {"data": "topgrouptotals", "field": "name", "sort": {"field": "sum", "order": "descending", "op": "sum"}},
      "range": ["#94D0FF", "#8795E8", "#966bff", "#AD8CFF", "#C774E8", "#c774a9", "#FF6AD5", "#ff6a8b", "#ff8b8b", "#ffa58b", "#ffde8b", "#cdde8b", "#8bde8b", "#20de8b"]
    },
    {
      "name": "cbot",
      "type": "ordinal",
      "domain": {"data": "bottomgrouptotals", "field": "name", "sort": {"field": "ads", "order": "descending", "op": "sum"}},
      "range": ["#20de8b", "#8bde8b", "#cdde8b", "#ffde8b", "#ffa58b", "#ff8b8b", "#ff6a8b", "#FF6AD5", "#c774a9", "#C774E8", "#AD8CFF", "#966bff", "#8795E8", "#94D0FF"]
    }
  ],

  "marks": [
    {
      "type": "text",
      "interactive": false,
      "from": {"data": "xaxis"},
      "encode": {
        "enter": {
          "y": {"signal": "chartHeight + chartPad / 3"},
          "x": {"scale": "x", "field": "weekstart", "band": 0.5},
          "text": {"field": "weekstart"},
          "fontWeight": {"value": "bold"},
          "baseline": {"value": "middle"},
          "align": {"value": "center"},
          "fill": {"value": "#000"}
        }
      }
    },
    {
      "type": "text",
      "interactive": false,
      "from": {"data": "xaxis"},
      "encode": {
        "enter": {
          "y": {"signal": "chartHeight + chartPad*(2/3)"},
          "x": {"scale": "x", "field": "weekstart", "band": 0.5},
          "text": {"field": "margin"},
          "baseline": {"value": "middle"},
          "align": {"value": "center"}
        },
        "update": {
          "fill": {"signal": "datum.margin < 0 ? 'firebrick' : 'steelblue'"}
        }
      }
    },
    {
      "type": "group",
      "encode": {
        "update": {
          "y": {"value": 0},
          "width": {"signal": "width"}
        }
      },
      "scales": [
        {
          "name": "y",
          "type": "linear",
          "range": [{"signal": "chartHeight"}, 0],
          "nice": true, "zero": true,
          "domain": {"data": "table", "field": "y0"}
        }
      ],
      "axes": [
        {"orient": "left", "scale": "y", "format": "s"}
      ],
      "marks": [
        {
          "type": "rect",
          "from": {"data": "top"},
          "encode": {
            "enter": {
              "y": {"scale": "y", "field": "y0"},
              "y2": {"scale": "y", "field": "y1"},
              "x": {"scale": "x", "field": "weekstart"},
              "width": {"scale": "x", "band": 1, "offset": -1},
              "fill": {"scale": "ctop", "field": "name"},
            },
            "update": {
              "fillOpacity": [
                {"test": "legendHover.value != datum.name & isDefined(legendHover.value)", "value": 0.5},
                { "value": 1 }
              ]
            }
          }
        }
      ],
      "legends": [
          {
            "stroke": "ctop",
            "offset": {"value": 15}, 
            "orient": {"value": "left"},
            "padding": 0,
            "fill": "ctop",
            "title": {"value": "Placeholder"},
            "encode": {
              "legend": {
                "enter": {
                  "clip": {"value": true},
                  "width": {"value": 100},
                }
              },
              "entries": {
                "update": {
                  "width": {"value": 5},
                  "height": {"value": 5},
                }
              },
              "title": {
                "update": {
                  "text": {"signal": "length(data('top')) > 0 ? data('top')[0]['side']: 'NA'"},
                  "fontSize": {"value": 24}
                }
              },
              "labels": {
                "name": "legendLabel",
                "interactive": true,
                "update": {
                  "text": {"signal": "[datum.value, format(data('topgrouptotals')[datum.index]['sum'], '.2s')+' ads, ' +  format(data('topgrouptotals')[datum.index]['sum'] / data('sidetotals')[0][data('top')[0]['side']], '.0%') ]"},
                  "fontSize": {"value": 12},
                  "fill": {"value": "black"}
                },
                "hover": {
                  "fill": {"value": "firebrick"}
                }
              },
              "symbols": {
                "name": "legendSymbol",
                "update": {
                  "shape": {"value": "square"},
                  "size": {"value": 100},
                  "stoke": {"value": "transparent"}
                }
              }
            }
          }
        ]
    },
    {
      "type": "group",
      "encode": {
        "update": {
          "y": {"signal": "chartHeight + chartPad"},
          "width": {"signal": "width"},
          "height": {"signal": "chartHeight + chartPad"}
        }
      },
      "scales": [
        {
          "name": "y",
          "type": "linear",
          "range": [0, {"signal": "chartHeight"}],
          "nice": true, "zero": true,
          "domain": {"data": "table", "field": "y1"}
        }
      ],

      "axes": [
        {"orient": "left", "scale": "y", "format": "s"}
      ],

      "marks": [
        {
          "type": "rect",
          "from": {"data": "bottom"},
          "encode": {
            "enter": {
              "y": {"scale": "y", "field": "y0"},
              "y2": {"scale": "y", "field": "y1"},
              "x": {"scale": "x", "field": "weekstart"},
              "width": {"scale": "x", "band": 1, "offset": -1},
              "fill": {"scale": "cbot", "field": "name"}
            }
          }
        }
      ],
      "legends": [
          {
            "stroke": "cbot",
            "orient": {"value": "left"},
            "padding": 0,
            "titleOrient": {"value": "top"},
            "offset": {"value": 30}, 
            "fill": "cbot",
            "title": {"value": "Placeholder"},
            "encode": {
              "legend": {
                "update": {
                  "height": {"signal": "chartHeight"}
                }
              },
              "title": {
                "update": {
                  "text": {"signal": "length(data('bottom')) > 0 ? data('bottom')[0]['side']: 'NA'"},
                  "fontSize": {"value": 24}
                }
              },
              "labels": {
                "name": "legendLabel",
                "interactive": true,
                "update": {
                  "text": {"signal": "[datum.value, format(data('bottomgrouptotals')[datum.index]['sum'], '.2s')+' ads, ' +  format(data('bottomgrouptotals')[datum.index]['sum'] / data('sidetotals')[0][data('bottom')[0]['side']], '.0%') ]"},
                  "fontSize": {"value": 12},
                  "fill": {"value": "black"}
                },
                "hover": {
                  "fill": {"value": "firebrick"}
                }
              },
              "symbols": {
                "name": "legendSymbol",
                "update": {
                  "shape": {"value": "square"},
                  "size": {"value": 100},
                  "stoke": {"value": "transparent"}
                }
              }
            }
          }
        ]
    }
  ]
}