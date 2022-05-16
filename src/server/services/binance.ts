const Binance = require('node-binance-api')
const cli = new Binance().options({
    APIKEY: process.env.API_KEY,
    APISECRET: process.env.API_SECRET
})

module.exports = cli