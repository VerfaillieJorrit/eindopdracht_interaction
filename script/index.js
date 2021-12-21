var myChart = '';

const init = function () {
  console.log('ready');
  const ctx = document.getElementById('myChart').getContext('2d');
  myChart = new Chart(ctx, {
    type: 'line',
    data: {
      labels: '',
      datasets: [
        {
          label: 'value',
          data: '',

          borderColor: ['rgba(0, 146, 255, 0.88)'],
          borderWidth: 1,
        },
      ],
    },
    options: {
      scales: {},
    },
  });
  //   get_data(stock_name);
  const button = document.querySelector('.c-button');

  button.addEventListener('click', click);
};

const click = function () {
  const stock_name = document.querySelector('.js-input').value;
  get_data(stock_name);
  get_history(stock_name);
};

const show_data = function (jsonObject) {
  const html = document.querySelector('.js-content');

  const response = jsonObject.quoteResponse;
  const result = response.result;
  for (item of result) {
    var marketCap = item.marketCap.toString();
    marketCap = marketCap.substring(0, 1) + '.' + marketCap.substring(1);
    var Volume = item.regularMarketVolume.toString();
    Volume = Volume.substring(0, 1) + '.' + Volume.substring(1);

    const htmlcode = `
    <label class="c-label--name">Open</label>
    <p class="c-label--value">${item.regularMarketOpen}</p>  
    <hr></hr>
    <label class="c-label--name">High</label>
    <p class="c-label--value">${item.regularMarketDayHigh}</p>  
    <hr></hr>
    <label class="c-label--name">Low</label>
    <p class="c-label--value">${item.regularMarketDayLow}</p>  
    <hr></hr>
    <label class="c-label--name">Volume</label>
    <p class="c-label--value">${Volume}</p>  
    <hr></hr>
    <label class="c-label--name">Market Cap</label>
    <p class="c-label--value">${marketCap}</p>  
    `;
    html.innerHTML = htmlcode;
  }
};

const show_history = function (jsonObject) {
  const timestamps = [];
  const stock_name = document.querySelector('.js-input').value;
  for (time of jsonObject[stock_name].timestamp) {
    let unix_timestamp = time;

    var date = new Date(unix_timestamp * 1000);

    var formattedTime = date.toLocaleString();

    timestamps.push(formattedTime.substring(0, 10));
  }

  myChart.data.datasets[0].data = jsonObject[stock_name].close;
  myChart.data.labels = timestamps;
  myChart.update();
};

const get_data = function (stock_name) {
  handleData(`https://yfapi.net/v6/finance/quote?region=US&lang=en&symbols=${stock_name}`, show_data);
};

const get_history = function (stock_name) {
  handleData(`https://yfapi.net/v8/finance/spark?interval=1d&range=1mo&symbols=${stock_name}`, show_history);
};

document.addEventListener('DOMContentLoaded', init);
