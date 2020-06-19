var apiKey = "SCsYW37j-Z5FNLh-Nfkp";

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

d3.csv("project_2_data_gary.csv").then(function(data) {
  //var dates = unpack(data.Dates, 1)
  var dates = []
  var sp500 = []
  var sp500corr = []
  var filtersp500corr = []

  data.forEach((d) => {
    dates.push(d.Date);
  })
  data.forEach((d) => {
    sp500.push(d.SP500);
  })
  data.forEach((d) => {
    sp500corr.push(d.SP500corr);
  })
  data.forEach((d) => {
    filtersp500corr.push(d.filterSP500corr);
  })
  
  //console.log(data);

  console.log(dates);
  console.log(sp500);
  console.log(sp500corr);
  console.log(filtersp500corr);

  //console.log(data[i].Date);
})

// function getMonthlyData() {
//   var queryUrl = `https://www.quandl.com/api/v3/datasets/WIKI/AMZN.json?start_date=2017-01-01&end_date=2017-12-31&collapse=monthly&api_key=${apiKey}`;
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

  d3.csv("project_2_data_gary.csv").then(function(data) {
    //var dates = unpack(data.Dates, 1)
    var dates = []
    var sp500 = []
    var sp500corr = []
    var filtersp500corr = []
    var open = []
    var high = []
    var low = []
    var close =[]
  
    data.forEach((d) => {dates.push(d.Date);})
    data.forEach((d) => {sp500.push(d.SP500);})
    data.forEach((d) => {sp500corr.push(d.SP500corr);})
    data.forEach((d) => {filtersp500corr.push(d.filterSP500corr);})
    data.forEach((d) => {open.push(d.Open);})
    data.forEach((d) => {high.push(d.High);})
    data.forEach((d) => {low.push(d.Low);})
    data.forEach((d) => {close.push(d.Last);})
    
    //console.log(data);
  
    console.log(dates);
    console.log(sp500);
    console.log(sp500corr);
    console.log(filtersp500corr);
    console.log(open);
    console.log(high);
    console.log(low);
    console.log(close);
  
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
          step: 'year',
          stepmode: 'backward',
          count: 3,
          label: '3y'
      }, {
          step: 'year',
          stepmode: 'backward',
          count: 5,
          label: '5y'
      }, {
          step: 'year',
          stepmode: 'backward',
          count: 10,
          label: '10y'
      }, {
          step: 'year',
          stepmode: 'backward',
          count: 20,
          label: '20y'
    }, {
          step: 'all',
      }],
    };

    // var trace1 = {
    //   type: "scatter",
    //   mode: "lines",
    //   name: name,
    //   x: dates,
    //   y: sp500,
    //   line: {
    //     color: "red"
    //   }
    // };

    var trace2 = {
      type: "scatter",
      mode: "lines",
      name: name,
      x: dates,
      y: filtersp500corr,
      yaxis: "y2",
      line: {
        color: "blue"
      }
    };

    // Candlestick Trace
    var trace1 = {
      type: "candlestick",
      x: dates,
      high: high,
      low: low,
      open: open,
      close: close
    };

    var data = [trace1, trace2];

    var layout = {
      title: `SP500 closing prices`,
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
        title: 'yaxis2 title',
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
}

buildPlot();
getMonthlyData();