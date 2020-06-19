d3.csv("project_2_data_gary.csv").then(function(data) {
  
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

  console.log(dates);
  console.log(sp500);
  console.log(sp500corr);
  console.log(filtersp500corr);
})

function updatePlotly() {
  // Use D3 to select the dropdown menu
  var dropdownMenu = d3.select("#selDataset");
  // Assign the value of the dropdown menu option to a variable
  var dataset = dropdownMenu.property("value");
  console.log(dataset);

  if (dataset === 'dataset1') {
    buildPlot_gary();  
  }

  if (dataset === 'dataset2') {
    buildPlot_bruce();
  }

  if (dataset === 'dataset3') {
    buildPlot_ben();
  }
}

// Call updatePlotly() when a change takes place to the DOM
d3.selectAll("#selDataset").on("change", updatePlotly);


function buildPlot_gary() {
  
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
    var returns = []
  
    data.forEach((d) => {dates.push(d.Date);})
    data.forEach((d) => {sp500.push(d.SP500);})
    data.forEach((d) => {sp500corr.push(d.SP500corr);})
    data.forEach((d) => {filtersp500corr.push(d.filterSP500corr);})
    data.forEach((d) => {open.push(d.Open);})
    data.forEach((d) => {high.push(d.High);})
    data.forEach((d) => {low.push(d.Low);})
    data.forEach((d) => {close.push(d.Last);})
    data.forEach((d) => {returns.push(d.Return);})
  
    console.log(dates);
    console.log(sp500);
    console.log(sp500corr);
    console.log(filtersp500corr);
    console.log(open);
    console.log(high);
    console.log(low);
    console.log(close);
    console.log(returns);
  
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

    Plotly.newPlot("plot", data, layout, {responsive: true});

  });
}

buildPlot_gary();

//##############################################################
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

d3.csv("CGr_model_returns.csv").then(function(data){
    var cap_growth = []

  data.forEach((c) => {
    cap_growth.push(c.Capital);
  })
})
  
  console.log(cap_growth);
  console.log(dates);
  console.log(sp500);
  console.log(signal);
})

function buildPlot_bruce() {

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
    
  
  
    console.log(dates);
    console.log(sp500);
    console.log(signal);
  
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

    var data = [trace1, trace2];

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

      showlegend: true
    };

    Plotly.newPlot("plot", data, layout, {responsive: true});

  });
};

// buildPlot_bruce();


//##################################################################
d3.csv("Ben_Final2_Data_df.csv").then(function(data) {
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

  console.log(dates);
  console.log(sp500);
  console.log(Z_Score);
  
})

function buildPlot_ben() {

  d3.csv("Ben_Final2_Data_df.csv").then(function(data) {
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
  
    console.log(dates);
    console.log(sp500);
    console.log(Z_Score);
  
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

    Plotly.newPlot("plot", data, layout, {responsive: true});

  });
}

// buildPlot_ben();

