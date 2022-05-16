import { Candle } from "../Modelos/Candle.enum";

export default class MediaMovil {
  static Simple(longitud: number, velas: any[]): number {
    let sum: number = 0;
    for (let index = 0; index < longitud; index++) {
      sum = sum + parseFloat(velas[velas.length - (index + 1)][Candle.Close]);
    }
    return sum / longitud;
  }
}
