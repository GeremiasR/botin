import { Candle } from "../Modelos/Candle.enum";
import { IEstocastico } from "../Modelos/Estocastico.interface";
import MediaMovil from "./MediaMovil";

const PERIODOS: number = 14;
const SMOOTH: number = 3;

export default class Estocastico {
  static Get(velas: any[]): IEstocastico {
    let estocastico: IEstocastico = { D: 0, K: 0, Top: 80, Mid: 50, Bottom: 20 };
    let acum_estocastico: number[] = [];
    for (let i = 0; i < PERIODOS; i++) {
      const precio_actual: number = parseFloat(
        velas[velas.length - (1 + i)][Candle.Close]
      );
      let precio_menor: number = precio_actual;
      let precio_mayor: number = 0;
      for (let index = 0; index < PERIODOS; index++) {
        precio_mayor =
          precio_mayor <
          parseFloat(velas[velas.length - (index + 1 + i)][Candle.High])
            ? parseFloat(velas[velas.length - (index + 1 + i)][Candle.High])
            : precio_mayor;
        precio_menor =
          precio_menor >
          parseFloat(velas[velas.length - (index + 1 + i)][Candle.Low])
            ? parseFloat(velas[velas.length - (index + 1 + i)][Candle.Low])
            : precio_menor;
      }
      const k =
        100 * ((precio_actual - precio_menor) / (precio_mayor - precio_menor));
      acum_estocastico.push(k);
    }
    let smooth_K: number = 0;
    for (let index = 0; index < SMOOTH; index++) {
        smooth_K = smooth_K + acum_estocastico[index]
    }
    estocastico.K = smooth_K / SMOOTH
    let smooth_D: number = 0;
    for (let i = 0; i < SMOOTH; i++) {
        let temp_k: number = 0
        for (let j = 0; j < SMOOTH; j++) {
            temp_k = temp_k + acum_estocastico[i+j]
        }
        smooth_D = smooth_D + temp_k / SMOOTH
    }
    estocastico.D = smooth_D / SMOOTH
    return estocastico;
  }
}

/* El Oscilador Estocástico se mide usando las líneas %K y %D.

%K = 100 [(C – Ln) / (Hn – Ln)]

Donde:

C es el precio de cierre actual
Ln es el precio más bajo durante las últimas "n" sesiones de trading
Hn es el precio más alto durante las últimas "n" sesiones de trading
%D = es la media móvil de %K durante N períodos */
