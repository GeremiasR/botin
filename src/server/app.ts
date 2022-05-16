require('dotenv').config()
import { log, logColor, colors } from "./utils/log"
import { Selector } from "./utils/Selector"


/* logColor("green", "hola") */
Selector(2)

/* 
const MARKET1 = process.argv[2]
const MARKET2 = process.argv[3]
const MARKET = MARKET1 + MARKET2
const PERIODO = process.argv[4] // Periodos: 1m,3m,5m,15m,30m,1h,2h,4h,6h,8h,12h,1d,3d,1w,1M
const ORDER_AMOUNT = process.argv[5]
const LONGITUD_SSL = process.argv[6]
console.log('__ Mercado: '+ MARKET + '\n__ Periodo: ' + PERIODO + '\n__ Tamaño de orden: ' + ORDER_AMOUNT + '\n__ Longitud ssL: ' + LONGITUD_SSL)

const store = new storage(`./data/${MARKET}.json`)

const sleep = (timeMs) => new Promise(resolve => setTimeout(resolve, timeMs)) */

// /*  INICIO VARIABLES GLOBALES    */
// var fmPrice
// var orden =  crearOrden('NULL', 0)
// var mme
// var sslCh
// var tendencia = -1 //tendencia alcista = 1, y tendencia bajista = 0, indefinida = -1
// var limites
// /*  FIN VARIABLES GLOBALES    */


// //Función que trae el balance de los futuros
// async function balanceFuturos(){
//     console.info(await client.futuresBalance() );
//     console.info( await client.futuresCandles( MARKET, PERIODO));
// }

// //Retorna el balance de la cuenta del usuario
// async function _balances(){
//     return await client.balance()
// }

// // FUNCION DE COMPRA
// async function futures_market_buy(){
//     const res = await client.futuresMarketBuy(MARKET, ORDER_AMOUNT)
//     const x = await client.futuresMarketSell(MARKET, ORDER_AMOUNT, {reduceOnly: true, stopPrice: sslCh.avrgLow.toFixed(5), type: 'STOP_MARKET'})
//     orden = crearOrden('BUY/LONG', fmPrice)
// }

// async function futures_market_sell(){
//     const res = await client.futuresMarketSell( MARKET, ORDER_AMOUNT)
//     const x = await client.futuresMarketBuy(MARKET, ORDER_AMOUNT, {reduceOnly: true ,stopPrice: sslCh.avrgHigh.toFixed(5), type: 'STOP_MARKET'})
//     console.log(x)
//     orden = crearOrden('SELL/SHORT', fmPrice)
// }

// async function close_short_position(){
//     const res = await client.futuresMarketBuy(MARKET, ORDER_AMOUNT, {reduceOnly: true})
//     orden = crearOrden('NULL', 0)
// }

// async function close_long_position(){
//     const res = await client.futuresMarketSell(MARKET, ORDER_AMOUNT, {reduceOnly: true})
//     orden = crearOrden('NULL', 0)
// }

// //Monitoreo broadcast (empieza en la parte dos y continua en la 3)

// async function broadcast() {
//     while(true){
//         try{
//             console.log('=====================================')
            
//             if(orden.tipo !== 'NULL'){
//                 await stopLose()
//             }else{
//                 await client.futuresCancelAll(MARKET)
//             }
//             await peticionVelas()
//             futureMarketPrice = await client.futuresPrices(MARKET)
//             if(futureMarketPrice){
//                 fmPrice = parseFloat(futureMarketPrice[MARKET])
//                 console.log('Precio actual de futuros: ' + fmPrice)
//                 sslLogic()
//             }
//             console.log('=====================================')
//         } catch (err) { }
//         await sleep(process.env.SLEEP_TIME)
//     }
// }

// // Peticiones de velas y operaciones necesarias con ellas

// async function peticionVelas(){
//     var velas = await client.futuresCandles(MARKET, PERIODO)
//     mme = mediaMovilExponencial(200, velas)
//     sslCh = sslAverages(parseInt(LONGITUD_SSL), velas)
//     //limites = limitesStopLose(10, velas)
//     imprimirIndicadorVelas()
// }

// function imprimirIndicadorVelas(){
//     console.log('Media móvil exponencial: ' + mme)
//     console.log('Indicador ssl High: ' + sslCh.avrgHigh)
//     console.log('Indicador ssl Low: ' + sslCh.avrgLow)
// }

// //Calculo de la Media movil exponencial
// function mediaMovilExponencial(longitud, velas){
//     let vela_actual
//     let sum = 0
//     let mediaMovilExponencial = 0

//     for(var i = 2; i<= (longitud+1); i++){
        
//         vela_actual = velas[velas.length - i]
//         sum = sum + parseFloat(vela_actual[4]) // Precio de cierre
//     }
//     mediaMovilExponencial = sum / longitud
//     return mediaMovilExponencial
// }

// //Funcion para calcular las medias del SSL, el argumento es la cantidad de velas anteriores que se tomarán
// function sslAverages(longitud, velas){
//         //const velas = await client.futuresCandles(MARKET, '5m')
//         let vela_iterar
//         let vela_actual = velas[velas.length - 2]
//         let sumHigh = 0
//         let sumLow = 0
//         let avrgHigh = 0
//         let avrgLow = 0

//     for(var i = 2; i<= (longitud+1); i++){ 
//         vela_iterar = velas[velas.length - i]
//         sumHigh = sumHigh + parseFloat(vela_iterar[2]) 
//         sumLow = sumLow + parseFloat(vela_iterar[3]) 
//     }

//     avrgHigh = sumHigh / longitud
//     avrgLow = sumLow / longitud

//     const sslChannel = {
//         avrgHigh,
//         avrgLow,
//         vela_actual,
//     }

//     return sslChannel
// }

// function limitesStopLose(longitud, velas){
//     let vela_iterar
//     let limites = {
//         highest: 0,
//         lowest: 0
//     }
//     for(var i = 2; i <= longitud +1 ; i++){   //Guardamos el más precio más alto y el más bajo de las ultimas *longitud* operaciones
//         vela_iterar = velas[velas.length - i]
//         if(parseFloat(vela_iterar[2] > limites.highest || limites.highest == 0)){
//             limites.highest = parseFloat(vela_iterar[2])
//         }
//         if(parseFloat(vela_iterar[3] < limites.lowest || limites.lowest == 0)){
//             limites.lowest = parseFloat(vela_iterar[3])
//         }
//     }
//     return limites
// }
// //Toma de desiciones con SSL

// async function sslLogic(){
//     /*
//     Cambios de tendencia:
//             * Cuando el precio actual de mercado supera el precio promedio "avrgHigh"
//                 y veniamos a la baja tenemos un cambio positivo en la tendencia
//             * Cuando el precio actual de mercado supera el precio promedio "avrgLow"
//                 y veniamos al alza tenemos un cambio negativo en la tendencia
//     */

//     //Comenzamos a operar
//     console.log('---------------------')
//     if(sslCh.vela_actual[1] > sslCh.vela_actual[4]){
//         console.log('Vela roja')
//         if(sslCh.vela_actual[4] < sslCh.avrgLow){ 
//             if(tendencia == 1){                //Cambio de tendencia alcista a bajista

//                 //Acá debemos cerrar las operaciones de compra abiertas que nos generen beneficios
//                 if(orden.tipo === 'BUY/LONG' && beneficio() > 0){
//                    console.log('Cerrar operaciones de compra')
//                     await close_long_position() 
//                 }
                
//                 if(sslCh.vela_actual[4] < mme && orden.tipo === 'NULL'){
//                     //Vender(Short)
//                     console.log('Vender (Short)')
//                     await futures_market_sell(ORDER_AMOUNT)
//                 }
//             }
//             tendencia = 0
//         }
//     }else if(sslCh.vela_actual[1] < sslCh.vela_actual[4]){
//         console.log('Vela verde')
//         if(sslCh.vela_actual[4] > sslCh.avrgHigh){ 
//             if(tendencia == 0){               //Cambio de tendencia bajista a alcista
//                 //Acá debemos cerrar las operaciones de venta abiertas que nos generen beneficios
//                 if(orden.tipo === 'SELL/SHORT' && beneficio() < 0){
//                     console.log('Cerrar operaciones de venta')
//                     await close_short_position()
//                 }
                
//                 if(sslCh.vela_actual[4] > mme && orden.tipo === 'NULL'){ // Acá definimos si podemos comprar en base a la media movil exponencial
//                     //Comprar(Long)
//                     console.log('Comprar(long)')
//                     await futures_market_buy(ORDER_AMOUNT)
//                 }
//             }
//             tendencia = 1
//         }
//     }else{
//         console.log('Vela neutra')
//     }
    
//     imprimirTendencia()

// }

// function beneficio(){
//     let costoActual = (fmPrice* orden.cantidad)/20
//     let costoOriginal = (orden.precio * orden.cantidad)/20  //Costo en USDT de los BTC teniendo en cuenta el apalancamiento de 20
//     let beneficio = costoActual - costoOriginal
//     return beneficio
// }

// function imprimirTendencia(){
//     switch(tendencia){
//         case 1:
//             console.log('Tendencia: + Alza +')
//             break
//         case 0:
//             console.log('Tendencia: - Baja -')
//             break
//         case -1:
//             console.log('Tendencia: * Esperando *')
//             break
//     }
//     console.log('Open: ' + sslCh.vela_actual[1])
//     console.log('Close: ' + sslCh.vela_actual[4])
// }

// // Devuelve mis ordenes de futuros abiertas
// async function openFutureOrders(){
//     const ordenesAbiertas = await client.futuresOpenOrders(MARKET)

//     console.log('Ordenes de futuros abiertas:');
//     console.log(ordenesAbiertas)

// }

// //Crear orden de compra
// function crearOrden(tipo, precio){
//     const orden = {
//         simbolo: MARKET,
//         precio,
//         cantidad: ORDER_AMOUNT,
//         tipo,
//     }
    
//     console.log(orden)
//     return orden
// }

// //Stop lose
// async function stopLose(){
//     console.log('Inicio funcion de Stop Lose')
//     /*
//     Si es una compra, se debe cerrar si: 
//         El precio actual de mercado es un *porcentaje x* menor al de la orden listada.
//     Si es una venta, se debe cerrar si:
//         El precio actual de mercado es un *porcentaje x* mayor al de la orden listada.
//     */
//     let costoActual = (fmPrice* orden.cantidad)/20
//     let costoOriginal = (orden.precio * orden.cantidad)/20  //Costo en USDT de los BTC teniendo en cuenta el apalancamiento de 20
//     let resto = costoActual - costoOriginal
//     let porcentaje = ((resto*100) / costoOriginal)*20
//     console.log('Costo Original: ' + costoOriginal.toFixed(4))
//     console.log('Costo Actual: ' + costoActual.toFixed(4))
//     console.log('Diferencia A - O: ' + resto.toFixed(4))
//     console.log('Porcentaje: ' + porcentaje)

//         if(orden.tipo === 'BUY/LONG' && fmPrice < sslCh.avrgLow){ //caida por debajo del avrgLow
//             await close_long_position()
//         }
//         if(orden.tipo === 'SELL/SHORT' && fmPrice > sslCh.avrgHigh){ // suba por arriba del avrgHig 
//             await close_short_position()
//         }
    
// }


// //Funcion de inicio del bot
// async function init() {
//     if(process.argv[5] !== 'resume'){
//         let x = await client.futuresPrices(MARKET)
//         x = x[MARKET]
//         fmPrice = parseFloat(x)
//         await client.futuresLeverage( MARKET, 20)
//         await client.futuresMarginType( MARKET, 'ISOLATED')
        
//         if(parseFloat( fmPrice)){
//             //await peticionVelas()
//             //await futures_market_buy()
//             //await futures_market_sell()
//             //await client.futuresCancelAll(MARKET)
//             broadcast()
            
//         }
//     }
    

// }

//init()


    //Orden devuelta por la API por un Sell(short) que canceló una posición de Compra(Long)
        /*[Object: null prototype] {
            orderId: 52443803799,
            symbol: 'BTCUSDT',
            status: 'NEW',
            clientOrderId: 'yrui8uJRYbN5QGChtg6oqi',
            price: '0',
            avgPrice: '0.00000',
            origQty: '0.001',
            executedQty: '0',
            cumQty: '0',
            cumQuote: '0',
            timeInForce: 'GTC',
            type: 'MARKET',
            reduceOnly: false,
            closePosition: false,
            side: 'SELL',
            positionSide: 'BOTH',
            stopPrice: '0',
            workingType: 'CONTRACT_PRICE',
            priceProtect: false,
            origType: 'MARKET',
            updateTime: 1651620486718
          }*/