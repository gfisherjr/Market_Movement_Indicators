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

d3.csv("Ben_Final_Data_df.csv").then(function(data) {
  //var dates = unpack(data.Dates, 1)
  var dates = []
  var sp500 = []
  var Z_Score = []
  

  data.forEach((d) => {
    dates.push(d.Date);
  })
  data.forEach((d) => {
    sp500.push(d.Closing_Price);
  })
  data.forEach((d) => {
    Z_Score.push(d.Z_Score);
  })
 
 
  //console.log(data);

  console.log(dates);
  console.log(sp500);
  console.log(Z_Score);
  
  //console.log(data[i].Date);
})

function buildPlot() {
  //var url = `https://www.quandl.com/api/v3/datasets/WIKI/AMZN.json?start_date=2017-01-01&end_date=2017-12-31&api_key=${apiKey}`;
  //var url = `https://www.quandl.com/api/v3/datasets/WIKI/AMZN.json?start_date=2017-01-01&end_date=2018-11-22&api_key=${apiKey}`;

  d3.csv("Ben_Final_Data_df.csv").then(function(data) {
    //var dates = unpack(data.Dates, 1)
    var dates = []
    var sp500 = []
    var Z_Score = []
  
    data.forEach((d) => {
      dates.push(d.Date);
    })
    data.forEach((d) => {
      sp500.push(d.Closing_Price);
    })
    data.forEach((d) => {
      Z_Score.push(d.Z_Score);
    })
    
    //console.log(data);
  
    console.log(dates);
    console.log(sp500);
    console.log(Z_Score);
  
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
      y: Z_Score,
      yaxis: "y2",
      line: {
        color: "blue"
      }
    };


    var data = [trace1, trace2];

    var layout = {
      title: `SP500 Closing Prices`,
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
        title: 'Correlation Rolling Z-Score',
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
//getMonthlyData();