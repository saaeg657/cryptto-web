
const getEthData = ()=>{
  return fetch('https://api.coinmarketcap.com/v1/ticker/ethereum/?convert=KRW')
    .then(res=>res.json())
    .then(result=>result[0])
    .catch(console.log)
}

export {
  getEthData
}