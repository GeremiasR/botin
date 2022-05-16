/* const Futures = require("../../services/Binance_Futures_Services");

class ScalpingSsl {
  price;
  mme;
  periodo = "5m"
  long= 10
  static async Start(MARKET, APALANCAMIENTO, TIPO_MARGEN) {
    this.price = await Futures.Prices(MARKET);
    //TODO get MARKET STATUS from mysql
    //const res = await Futures.Apalancamiento(MARKET, APALANCAMIENTO);
    //const res2 = await Futures.MarginType(MARKET, TIPO_MARGEN);
    //console.log(res, res2);
    if (this.price) {
      return this.price;
    }
  }

  static async SslAvg(long) {
    const LONGITUD = this.long
    const CANDLES = await Futures.Candles(MARKET, this.periodo)
    let start = CANDLES.length - LONGITUD - 2;
    let vela_iterar = CANDLES[start];
    let vela_actual = CANDLES[CANDLES.length - 2];
    let sumHigh = 0;
    let sumLow = 0;
    let avrgHigh = 0;
    let avrgLow = 0;

    for (var i = 1; i <= LONGITUD; i++) {
      sumHigh = sumHigh + parseFloat(vela_iterar[2]);
      sumLow = sumLow + parseFloat(vela_iterar[3]);
      vela_iterar = CANDLES[start + i];
    }

    avrgHigh = sumHigh / LONGITUD;
    avrgLow = sumLow / LONGITUD;

    const sslChannel = {
      avrgHigh,
      avrgLow,
      vela_actual,
    };

    return sslChannel;
  }
}

module.exports = ScalpingSsl;
 */