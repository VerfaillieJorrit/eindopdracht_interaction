const init = function () {
  console.log('ready');
  //   get_data(stock_name);
};
const show_data = function (jsonObject) {
  console.log(jsonObject);
};

const get_data = function (stock_name) {
  handleData(`https://yfapi.net/v6/finance/quote?region=US&lang=en&symbols=${stock_name}`, show_data);
};

document.addEventListener('DOMContentLoaded', init());
