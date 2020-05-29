// Set new default font family and font color to mimic Bootstrap's default styling
Chart.defaults.global.defaultFontFamily = 'Nunito', '-apple-system,system-ui,BlinkMacSystemFont,"Segoe UI",Roboto,"Helvetica Neue",Arial,sans-serif';
Chart.defaults.global.defaultFontColor = '#858796';

function number_format(number, decimals, dec_point, thousands_sep) {
  // *     example: number_format(1234.56, 2, ',', ' ');
  // *     return: '1 234,56'
  number = (number + '').replace(',', '').replace(' ', '');
  var n = !isFinite(+number) ? 0 : +number,
    prec = !isFinite(+decimals) ? 0 : Math.abs(decimals),
    sep = (typeof thousands_sep === 'undefined') ? ',' : thousands_sep,
    dec = (typeof dec_point === 'undefined') ? '.' : dec_point,
    s = '',
    toFixedFix = function (n, prec) {
      var k = Math.pow(10, prec);
      return '' + Math.round(n * k) / k;
    };
  // Fix for IE parseFloat(0.55).toFixed(0) = 0;
  s = (prec ? toFixedFix(n, prec) : '' + Math.round(n)).split('.');
  if (s[0].length > 3) {
    s[0] = s[0].replace(/\B(?=(?:\d{3})+(?!\d))/g, sep);
  }
  if ((s[1] || '').length < prec) {
    s[1] = s[1] || '';
    s[1] += new Array(prec - s[1].length + 1).join('0');
  }
  return s.join(dec);
}

class accion {
  constructor(name, dates, values) {
    this.name = name;
    this.dates = dates;
    this.values = values;
  }
  getName() {
    return this.name;
  }
  getDates() {
    return this.dates;
  }
  getValues() {
    return this.values;
  }
  size() {
    return this.dates.length;
  }
  getUltimo() {
    return this.values[this.values.length - 1];
  }
  getInverso() {
    return 1 / this.getUltimo();
  }
}

function updateAreaChartData(chart, label, data) {
  chart.data.labels.push(label);
  chart.data.datasets.forEach((dataset) => {
    dataset.data.push(data);
  });
  chart.update();
}

function removeAreaChartData(chart) {
  var size = chart.data.labels.length;
  for (i = 0; i < size; i++) {
    chart.data.labels.pop();
    chart.data.datasets[0].data.pop();
  }
  chart.update();
}

function changeChartValuesClass(chart, accion) {
  chart.data.datasets[0].label = accion.getName();
  removeAreaChartData(chart);
  var cuantosValues = accion.getValues().length;
  for (i = 0; i < cuantosValues; i++) {
    updateAreaChartData(chart, accion.getDates()[i], accion.getValues()[i]);
  }
  chart.update();
}

function changeChartValues(chart, label, labels, values) {
  chart.data.datasets[0].label = label
  //Limpiamos valores antiguos
  removeAreaChartData(chart);

  //Agregamos valores nuevos
  var cuantosValues = values.length;
  for (i = 0; i < cuantosValues; i++) {
    console.log(labels[i] + " " + values[i])
    updateAreaChartData(chart, labels[i], values[i]);
  }
  chart.update();
}

function setLabels(chart, ejex) {
  //Recorremos el vector con un ciclo for despues de obtener su dimension
  var x = chart.data.labels.length;
  console.log("El numero de la variable es: " + x)
  for (i = 0; i < x; i++) {
    chart.data.labels.pop();
  }
  //Lo recorremos con una funcion forEach
  ejex.forEach((label) => chart.data.labels.push(label))
  //chart.data.labels.push(ejex);
  var x = chart.data.labels.length;
  console.log("El numero de la variable es: " + x)
  chart.update();
}

// Area Chart Example
var ctx = document.getElementById("myAreaChart");
var myLineChart = new Chart(ctx, {
  type: 'line',
  data: {
    labels: ["Jan", "Feb", "Mar", "Apr", "May", "Agosto", "Diciembre", "Aug", "Sep", "Oct", "Nov", "Dec"],
    datasets: [{
      label: "Earnings",
      lineTension: 0.3,
      backgroundColor: "rgba(78, 115, 223, 0.05)",
      borderColor: "rgba(78, 115, 223, 1)",
      pointRadius: 3,
      pointBackgroundColor: "rgba(78, 115, 223, 1)",
      pointBorderColor: "rgba(78, 115, 223, 1)",
      pointHoverRadius: 3,
      pointHoverBackgroundColor: "rgba(78, 115, 223, 1)",
      pointHoverBorderColor: "rgba(78, 115, 223, 1)",
      pointHitRadius: 10,
      pointBorderWidth: 2,
      data: [200, 10000, 5000, 80000, 10000, 500, 15000, 50000, 20000, 30000, 25000, 40000],
    }],
  },
  options: {
    maintainAspectRatio: false,
    layout: {
      padding: {
        left: 10,
        right: 25,
        top: 25,
        bottom: 0
      }
    },
    scales: {
      xAxes: [{
        time: {
          unit: 'date'
        },
        gridLines: {
          display: false,
          drawBorder: false
        },
        ticks: {
          maxTicksLimit: 7
        }
      }],
      yAxes: [{
        ticks: {
          maxTicksLimit: 5,
          padding: 10,
          // Include a dollar sign in the ticks
          callback: function (value, index, values) {
            return '$' + number_format(value);
          }
        },
        gridLines: {
          color: "rgb(234, 236, 244)",
          zeroLineColor: "rgb(234, 236, 244)",
          drawBorder: false,
          borderDash: [2],
          zeroLineBorderDash: [2]
        }
      }],
    },
    legend: {
      display: false
    },
    tooltips: {
      backgroundColor: "rgb(255,255,255)",
      bodyFontColor: "#858796",
      titleMarginBottom: 10,
      titleFontColor: '#6e707e',
      titleFontSize: 14,
      borderColor: '#dddfeb',
      borderWidth: 1,
      xPadding: 15,
      yPadding: 15,
      displayColors: false,
      intersect: false,
      mode: 'index',
      caretPadding: 10,
      callbacks: {
        label: function (tooltipItem, chart) {
          var datasetLabel = chart.datasets[tooltipItem.datasetIndex].label || '';
          return datasetLabel + ': $' + number_format(tooltipItem.yLabel);
        }
      }
    }
  }
});

function writeList(accion) {
  var listaHistorica = "";
  var size = accion.size();

  for (i = size - 1; i >= size - 10; i--) {
    listaHistorica = listaHistorica + accion.getDates()[i] + " :  $" + accion.getValues()[i] + ' COP\n';
  }
  return listaHistorica;
}

euro = new accion("Euro",
  ["Mayo 1", "Mayo 3", "Mayo 4", "Mayo 5", "Mayo 6", "Mayo 7", "Mayo 8", "Mayo 9", "Mayo 10", "Mayo 11", "Mayo 12", "Mayo 13", "Mayo 14", "Mayo 15",
    "Mayo 17", "Mayo 18", "Mayo 19", "Mayo 20", "Mayo 21", "Mayo 22", "Mayo 24", "Mayo 25",
  ],
  [4326.47, 4329.32, 4333.97, 4347.44, 4254.96, 4277.87, 4247.19, 4217.09, 4213.26, 4221.72, 4211.36, 4211.82, 4228.01, 4258.22, 4229.90, 4232.50, 4203.69,
    4186.70, 4190.43, 4128.19, 4113.80, 4113.40
  ]);

dolar = new accion("Dolar",
  ["Mayo 1", "Mayo 3", "Mayo 4", "Mayo 5", "Mayo 6", "Mayo 7", "Mayo 8", "Mayo 9", "Mayo 10", "Mayo 11", "Mayo 12", "Mayo 13", "Mayo 14", "Mayo 15",
    "Mayo 17", "Mayo 18", "Mayo 19", "Mayo 20", "Mayo 21", "Mayo 22", "Mayo 24", "Mayo 25",
  ],
  [3932.72, 3932.72, 3932.72, 3990.10, 3926.07, 3961.66, 3924.54, 3882.27, 3882.27, 3882.27, 3901.34, 3880.48, 3901.30, 3947.79, 3926.06, 3926.06, 3851.07,
    3824.30, 3804.12, 3774.25, 3782.66, 3782.66
  ]);

yen = new accion("Yen",
  ["Mayo 1", "Mayo 3", "Mayo 4", "Mayo 5", "Mayo 6", "Mayo 7", "Mayo 8", "Mayo 9", "Mayo 10", "Mayo 11", "Mayo 12", "Mayo 13", "Mayo 14", "Mayo 15",
    "Mayo 17", "Mayo 18", "Mayo 19", "Mayo 20", "Mayo 21", "Mayo 22", "Mayo 24", "Mayo 25",
  ],
  [36.8435, 36.9759, 37.0486, 37.3667, 36.8781, 37.3056, 36.8478, 36.3728, 36.4271, 36.2197, 36.2430, 36.5300, 36.6997, 36.4362, 36.4828, 35.8653,
    35.5371, 35.4620, 35.0182, 35.0514, 35.0260, 35.0343
  ]);

yuan = new accion("Yuan",
  ["Mayo 1", "Mayo 3", "Mayo 4", "Mayo 5", "Mayo 6", "Mayo 7", "Mayo 8", "Mayo 9", "Mayo 10", "Mayo 11", "Mayo 12", "Mayo 13", "Mayo 14", "Mayo 15",
    "Mayo 17", "Mayo 18", "Mayo 19", "Mayo 20", "Mayo 21", "Mayo 22", "Mayo 24", "Mayo 25",
  ],
  [559.777, 559.553, 560.007, 564.598, 555.937, 557.678, 553.247, 549.830, 549.611, 550.643, 548.888, 548.284, 550.853, 555.381, 550.330, 550.787, 541.773,
    539.750, 529.784, 529.293, 529.107, 529.055
  ]);

rublo = new accion("Rublo",
  ["Mayo 1", "Mayo 3", "Mayo 4", "Mayo 5", "Mayo 6", "Mayo 7", "Mayo 8", "Mayo 9", "Mayo 10", "Mayo 11", "Mayo 12", "Mayo 13", "Mayo 14", "Mayo 15",
    "Mayo 17", "Mayo 18", "Mayo 19", "Mayo 20", "Mayo 21", "Mayo 22", "Mayo 24", "Mayo 25",
  ],
  [53.1723, 52.3585, 52.4277, 53.3545, 53.2676, 53.1998, 53.0405, 52.9512, 53.0000, 53.0668, 52.9195, 52.7562, 53.6019, 53.1592, 53.1442, 52.9814, 52.8507,
    53.5781, 53.1563, 52.7118, 52.7782, 52.6958
  ]);

ecopetrol = new accion("Ecopetrol",
  ["Mayo 4", "Mayo 5", "Mayo 6", "Mayo 7", "Mayo 8", "Mayo 11", "Mayo 12", "Mayo 13", "Mayo 14", "Mayo 15",
    "Mayo 18", "Mayo 19", "Mayo 20", "Mayo 21", "Mayo 22",
  ],
  [1960, 1985, 1950, 1975, 2040, 2065, 1995, 1920, 1930, 1930, 2050, 1985, 2030, 2000, 1970]);

bancolombia = new accion("Bancolombia",
  ["Mayo 4", "Mayo 5", "Mayo 6", "Mayo 7", "Mayo 8", "Mayo 11", "Mayo 12", "Mayo 13", "Mayo 14", "Mayo 15",
    "Mayo 18", "Mayo 19", "Mayo 20", "Mayo 21", "Mayo 22",
  ],
  [24140, 23720, 23000, 24240, 24000, 23600, 23500, 22260, 21480, 21520, 22800, 21620, 21520, 21700, 21220]);

gruposura = new accion("Sura",
  ["Mayo 4", "Mayo 5", "Mayo 6", "Mayo 7", "Mayo 8", "Mayo 11", "Mayo 12", "Mayo 13", "Mayo 14", "Mayo 15",
    "Mayo 18", "Mayo 19", "Mayo 20", "Mayo 21", "Mayo 22",
  ],
  [18120, 18160, 17800, 18200, 18180, 17520, 17320, 17000, 16900, 16200, 16500, 16700, 16220, 16280, 16300]);

grupoargos = new accion("Argos",
  ["Mayo 4", "Mayo 5", "Mayo 6", "Mayo 7", "Mayo 8", "Mayo 11", "Mayo 12", "Mayo 13", "Mayo 14", "Mayo 15",
    "Mayo 18", "Mayo 19", "Mayo 20", "Mayo 21", "Mayo 22",
  ],
  [3.620, 3.650, 3.610, 3.720, 3.710, 3.645, 3.530, 3.340, 3.355, 3.650, 3.615, 3.600, 3.510, 3.575, 3.510]);

interelectrica = new accion("Interelectrica",
  ["Mayo 4", "Mayo 5", "Mayo 6", "Mayo 7", "Mayo 8", "Mayo 11", "Mayo 12", "Mayo 13", "Mayo 14", "Mayo 15",
    "Mayo 18", "Mayo 19", "Mayo 20", "Mayo 21", "Mayo 22",
  ],
  [17900, 17600, 17740, 18580, 17800, 18100, 18100, 18000, 18400, 18200, 18500, 18480, 18520, 18400, 18340, ]);