import BollingerBands from "../../indicadores/BollingerBands";
import Estocastico from "../../indicadores/Estocastico";
import MediaMovil from "../../indicadores/MediaMovil";
import { IBollingerBands } from "../../Modelos/BollingerBands.interface";
import { Candle } from "../../Modelos/Candle.enum";
import { IEstocastico } from "../../Modelos/Estocastico.interface";
import { BinanceFutures } from "../../services/BinanceFutures";
//https://www.ig.com/es/estrategias-de-trading/bandas-de-bollinger---que-son---como-se-utilizan-en-trading--190204
//https://admiralmarkets.com/es/education/articles/forex-indicators/indicador-estocastico

const PERIODO: string = "1h";
const LONGITUD_INDICADORES: number = 20;

export abstract class Breakout {
  public static async Start(
    MARKET: string,
    APALANCAMIENTO: number,
    TIPO_MARGEN: string
  ) {
    //const res = await Futures.Apalancamiento(MARKET, APALANCAMIENTO);
    //const res2 = await Futures.MarginType(MARKET, TIPO_MARGEN);
    //console.log(res, res2);
    const CANDLES: any[] = await BinanceFutures.Candles(MARKET, PERIODO);
    const bollingerBands : IBollingerBands = BollingerBands.Get(LONGITUD_INDICADORES, CANDLES)
    const estocastico: IEstocastico = Estocastico.Get(CANDLES)
    console.log(bollingerBands)
    console.log(estocastico)
  }
}