import { IBollingerBands } from "../Modelos/BollingerBands.interface";
import { Candle } from "../Modelos/Candle.enum";
import MediaMovil from "./MediaMovil";

export default class BollingerBands {
  static Get(longitud: number, velas: any[]): IBollingerBands {
    let bollingerBands : IBollingerBands = {Lower: 0, Upper: 0, Median: 0}
    bollingerBands.Median = MediaMovil.Simple(longitud, velas)
    let sum: number = 0;
    for (let index = 0; index < longitud; index++) {
      sum = sum + Math.pow(parseFloat(velas[velas.length - (index + 1)][Candle.Close]) - bollingerBands.Median, 2);
    }
    sum = sum / 20
    bollingerBands.Upper = bollingerBands.Median + (Math.sqrt(sum)*2)
    bollingerBands.Lower = bollingerBands.Median - (Math.sqrt(sum)*2)
    return bollingerBands;
  }
}
