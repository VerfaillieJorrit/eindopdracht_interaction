const init = function () {
  console.log('ready');
  //   get_data(stock_name);
  const button = document.querySelector('.c-button');
  
  button.addEventListener('click', click);
};

const click = function () {
const stock_name = document.querySelector('.js-input').value
get_data(stock_name)
}











const show_data = function (jsonObject) {
  const html = document.querySelector('.js-content');
  
  const response = jsonObject.quoteResponse;
  const result =response.result;
  for (item of result) {
    var marketCap = item.marketCap.toString();
    marketCap = marketCap.substring(0,1) + '.' + marketCap.substring(1,)
    var Volume = item.regularMarketVolume.toString();
    Volume = Volume.substring(0,1) + '.' + Volume.substring(1,)
    
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
    `
    html.innerHTML = htmlcode
    const ctx = document.getElementById('myChart').getContext('2d');
    const myChart = new Chart(ctx, {
      type: 'line',
      data: {
          labels: ['Red', 'Blue', 'Yellow', 'Green', 'Purple', 'Orange'],
          datasets: [{
              label: 'value',
              data: [12, 19, 3, 5, 2, 3],
              backgroundColor: [
                  'rgba(255, 99, 132, 0.2)',
                  'rgba(54, 162, 235, 0.2)',
                  'rgba(255, 206, 86, 0.2)',
                  'rgba(75, 192, 192, 0.2)',
                  'rgba(153, 102, 255, 0.2)',
                  'rgba(255, 159, 64, 0.2)'
              ],
              borderColor: [
                  'rgba(255, 99, 132, 1)',
                  'rgba(54, 162, 235, 1)',
                  'rgba(255, 206, 86, 1)',
                  'rgba(75, 192, 192, 1)',
                  'rgba(153, 102, 255, 1)',
                  'rgba(255, 159, 64, 1)'
              ],
              borderWidth: 1
          }]
      },
      options: {
          scales: {
              y: {
                  beginAtZero: true
              }
          }
      }
  });
  }
  
};
























const get_data = function (stock_name) {
  handleData(`https://yfapi.net/v6/finance/quote?region=US&lang=en&symbols=${stock_name}`, show_data);
};













document.addEventListener('DOMContentLoaded', init);
