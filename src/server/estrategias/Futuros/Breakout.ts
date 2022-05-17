import BollingerBands from "../../indicadores/BollingerBands";
import Estocastico from "../../indicadores/Estocastico";
import MediaMovil from "../../indicadores/MediaMovil";
import { IBollingerBands } from "../../Modelos/BollingerBands.interface";
import { Candle } from "../../Modelos/Candle.enum";
import { IEstocastico } from "../../Modelos/Estocastico.interface";
import { BinanceFutures } from "../../services/BinanceFutures";
import { IMensaje, Status } from "../../utils/Status";
//https://www.ig.com/es/estrategias-de-trading/bandas-de-bollinger---que-son---como-se-utilizan-en-trading--190204
//https://admiralmarkets.com/es/education/articles/forex-indicators/indicador-estocastico

const PERIODO: string = "1m";
const LONGITUD_INDICADORES: number = 20;
const MONTO_ORDEN: number = 0.001;
const APALANCAMIENTO: number = 1;
const TIPO_MARGEN: string = "ISOLATED";

export abstract class Breakout {
  public static async Start(MARKET: string) {
    /* const res = await BinanceFutures.Apalancamiento(MARKET, APALANCAMIENTO);
    const res2 = await BinanceFutures.MarginType(MARKET, TIPO_MARGEN);
    console.log(res, res2);
    const res3 = await BinanceFutures.SellShort(MARKET, MONTO_ORDEN, 30150)
    console.log(res3) */
    const CANDLES: any[] = await BinanceFutures.Candles(MARKET, PERIODO);
    const bollingerBands: IBollingerBands = BollingerBands.Get(
      LONGITUD_INDICADORES,
      CANDLES
    );
    const estocastico: IEstocastico = Estocastico.Get(CANDLES);
    console.log(bollingerBands);
    console.log(estocastico);
 /*    let started: boolean = true;
    while (started) {
      const status: IMensaje[] = [
        { Color: "red", Texto: "Hola" },
        { Color: "green", Texto: "Carola" },
        { Color: "gray", Texto: "Como estas?" },
      ];
      await Status(2000, status);
    } */
  }
}
