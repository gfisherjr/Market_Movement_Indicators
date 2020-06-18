

/**
 * Helper function to select stock data
 * Returns an array of values
 * @param {array} rows
 * @param {integer} index
 * index 0 - Date
 * index 1 - Open
 * index 2 - High
 * index 3 - Low
 * index 4 - Close
 * index 5 - Volume
 */
function unpack(rows, index) {
  return rows.map(function(row) {
    return row[index];
  });
}

d3.csv("jun98tojun20.csv").then(function(data) {
  //var dates = unpack(data.Dates, 1)
  var dates = []
  var sp500 = []
  var signal = []
  // var filtersp500corr = []

  data.forEach((d) => {
    dates.push(d.Date);
  })
  data.forEach((d) => {
    sp500.push(d.Settle);
  })
  data.forEach((d) => {
    signal.push(d.signal);
  })

d3.csv("CGr_model_returns.csv").then(function(date){
    var cap_growth = []

  data.forEach((c) => {
    cap_growth.push(c.Capital );
  })

})
  
  
  //console.log(data);

  console.log(dates);
  console.log(sp500);
  console.log(signal);
  

  //console.log(data[i].Date);
})

// function getMonthlyData() {
//   // var queryUrl = `https://www.quandl.com/api/v3/datasets/WIKI/AMZN.json?start_date=2017-01-01&end_date=2017-12-31&collapse=monthly&api_key=${apiKey}`;
//   //var queryUrl = `https://www.quandl.com/api/v3/datasets/WIKI/AMZN.json?start_date=2016-10-01&end_date=2017-10-01&collapse=monthly&api_key=${apiKey}`;
//   d3.json(queryUrl).then(function(data) {
//     var dates = unpack(data.dataset.data, 0);
//     var openPrices = unpack(data.dataset.data, 1);
//     var highPrices = unpack(data.dataset.data, 2);
//     var lowPrices = unpack(data.dataset.data, 3);
//     var closingPrices = unpack(data.dataset.data, 4);
//     var volume = unpack(data.dataset.data, 5);
//     console.log(openPrices);
//     buildTable(dates, openPrices, highPrices, lowPrices, closingPrices, volume);
//   });
// }

// function buildTable(dates, openPrices, highPrices, lowPrices, closingPrices, volume) {
//   var table = d3.select("#summary-table");
//   var tbody = table.select("tbody");
//   var trow;
//   console.log(dates);
//   for (var i = 0; i < dates.length; i++) {
//   //for (var i = 0; i < 12; i++) {
//     trow = tbody.append("tr");
//     trow.append("td").text(dates[i]);
//     trow.append("td").text(openPrices[i]);
//     trow.append("td").text(highPrices[i]);
//     trow.append("td").text(lowPrices[i]);
//     trow.append("td").text(closingPrices[i]);
//     trow.append("td").text(volume[i]);
//   }
// }

function buildPlot() {
  //var url = `https://www.quandl.com/api/v3/datasets/WIKI/AMZN.json?start_date=2017-01-01&end_date=2017-12-31&api_key=${apiKey}`;
  //var url = `https://www.quandl.com/api/v3/datasets/WIKI/AMZN.json?start_date=2017-01-01&end_date=2018-11-22&api_key=${apiKey}`;

  d3.csv("jun98tojun20.csv").then(function(data) {
    //var dates = unpack(data.Dates, 1)
    var dates = []
    var sp500 = []
    var signal = []
    // var filtersp500corr = []
  
    data.forEach((d) => {
      dates.push(d.Date);
    })
    data.forEach((d) => {
      sp500.push(d.Settle);
    })
    data.forEach((d) => {
      signal.push(d.signal);
    })
    // data.forEach((d) => {
    //   filtersp500corr.push(d.filterSP500corr);
    // })new--------------
  d3.csv("CGr_model_returns.csv").then(function(data) {
    var cap_growth =[]
    
    data.forEach((c) => {
      cap_growth.push(c.Capital );
    })
    //end new-----------
    //console.log(data);
  
    console.log(dates);
    console.log(sp500);
    console.log(signal);
    console.log(cap_growth);
    // console.log(filtersp500corr);
  
    //console.log(data[i].Date);
  
    var selectorOptions = {
      buttons: [{
          step: 'month',
          stepmode: 'backward',
          count: 1,
          label: '1m'
      }, {
          step: 'month',
          stepmode: 'backward',
          count: 6,
          label: '6m'
      }, {
          step: 'year',
          stepmode: 'todate',
          count: 1,
          label: 'YTD'
      }, {
          step: 'year',
          stepmode: 'backward',
          count: 1,
          label: '1y'
      }, {
          step: 'all',
      }],
    };

    var trace1 = {
      type: "scatter",
      mode: "lines",
      name: name,
      x: dates,
      y: sp500,
      line: {
        color: "red"
      }
    };

    var trace2 = {
      type: "scatter",
      mode: "lines",
      name: name,
      x: dates,
      y: signal,
      yaxis: "y2",
      line: {
        color: "blue"
      }
    };

    var trace3 = {
      type: "scatter",
      mode: "lines",
      name: name,
      x: dates,
      y: cap_growth,
      yaxis: "y3",
      line: {
        color: "green"
      }
    };

    // Candlestick Trace
    // var trace2 = {
    //   type: "candlestick",
    //   x: dates,
    //   // high: highPrices,
    //   // low: lowPrices,
    //   open: sp500corr,
    //   close: filtersp500corr
    // };

    var data = [trace1, trace2, trace3];

    var layout = {
      title: `SP500 closing prices vs Signal`,
      // autosize: true,
      // width: 500,
      height: 700,
      xaxis: {
        rangeselector: selectorOptions,
        rangeslider: {},
        range: [dates[0], dates[-1]],
        type: "date"
      },
      yaxis: {
        autorange: true,
        type: "linear",
        side: "right"
      },
      yaxis2: {
        title: 'Signal Std.',
        titlefont: {color: 'rgb(148, 103, 189)'},
        tickfont: {color: 'rgb(148, 103, 189)'},
        overlaying: 'y',
        side: 'left'
      },

      yaxis3: {
        title: 'Capital',
        titlefont: {color: 'rgb(148, 103, 189)'},
        tickfont: {color: 'rgb(148, 103, 189)'},
        overlaying: 'y',
        side: 'left'
      },
      showlegend: true
    };

    // Plotly - Making a Responsive Chart:
    // https://plotly.com/javascript/configuration-options/#making-a-responsive-chart
    Plotly.newPlot("plot", data, layout, {responsive: true});

  });
});
}
buildPlot();
// getMonthlyData();