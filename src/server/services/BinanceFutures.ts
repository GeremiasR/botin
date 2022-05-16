const client = require('./binance')

export abstract class BinanceFutures {
    static async Prices(MARKET) {
        var x = await client.futuresPrices(MARKET)
        x = x[MARKET]
        return parseFloat(x)
    }

    static async Apalancamiento(MARKET, value){
        return await client.futuresLeverage( MARKET, value)
    }

    static async MarginType(MARKET, tipo){
       return await client.futuresMarginType( MARKET, tipo) 
    }
    
    static async Candles(MARKET, PERIODO): Promise<any[]>{
        return await client.futuresCandles(MARKET, PERIODO)
    }
    
    static async CancelAllOrders(MARKET){
        return await client.futuresCancelAll(MARKET)
    }
    
    static async BuyLong(MARKET, ORDER_AMOUNT, stopLoss){
        const res = await client.futuresMarketBuy(MARKET, ORDER_AMOUNT)
        await client.futuresMarketSell(MARKET, ORDER_AMOUNT, {reduceOnly: true, stopPrice: stopLoss, type: 'STOP_MARKET'})
        return res
    }

    static async SellShort(MARKET, ORDER_AMOUNT, stopLoss){
        const res = await client.futuresMarketSell( MARKET, ORDER_AMOUNT)
        await client.futuresMarketBuy(MARKET, ORDER_AMOUNT, {reduceOnly: true ,stopPrice: stopLoss, type: 'STOP_MARKET'})
        return res
    }
    
    static async CloseShortPosition(MARKET, ORDER_AMOUNT){
        return await client.futuresMarketBuy(MARKET, ORDER_AMOUNT, {reduceOnly: true})
    }

    static async CloseLongPosition(MARKET, ORDER_AMOUNT){
        return await client.futuresMarketSell(MARKET, ORDER_AMOUNT, {reduceOnly: true})
    }


}