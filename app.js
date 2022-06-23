const currElOne = document.getElementById('currency-one');
const currElTwo = document.getElementById('currency-two');
const amountElOne = document.getElementById('amount-one');
const amountElTwo = document.getElementById('amount-two');
const rateEl = document.getElementById('rate');
const swapEl = document.getElementById('swap');

// FETCH EXCHANGE RATES AND UPDATE DOM

function calculate() {
  const currencyOne = currElOne.value;
  const currencyTwo = currElTwo.value;

  fetch(`https://open.er-api.com/v6/latest/${currencyOne}`)
  .then(res => res.json())
  .then(data => {
    const rate = data.rates[currencyTwo];
    rateEl.innerText = `1 ${currencyOne} = ${rate} ${currencyTwo}`;
    amountElTwo.value = (amountElOne.value * rate).toFixed(2);
  })
  
};

calculate();

// EVENT LISTENERS

currElOne.addEventListener('change', calculate);
amountElOne.addEventListener('input', calculate);
currElTwo.addEventListener('change', calculate);
amountElTwo.addEventListener('input', calculate);

swapEl.addEventListener('click', swapFunc);

function swapFunc() {
  const temp = currElOne.value;
  currElOne.value = currElTwo.value;
  currElTwo.value = temp;
  calculate();
}