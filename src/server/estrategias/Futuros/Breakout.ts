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

enum ESTADO {
  LONG= 1,
  SHORT= 2,
  ESPERA= 3
}

export abstract class Breakout {
  static estado: number;
  static started: boolean;
  static estocastico : IEstocastico;
  static bollinger : IBollingerBands;
  static candles : any[];
  public static async Start(MARKET: string) {
    /* const res = await BinanceFutures.Apalancamiento(MARKET, APALANCAMIENTO);
    const res2 = await BinanceFutures.MarginType(MARKET, TIPO_MARGEN);
    console.log(res, res2);
    const res3 = await BinanceFutures.SellShort(MARKET, MONTO_ORDEN, 30150)
    console.log(res3) */
    this.started = true
    this.estado = ESTADO.ESPERA;
    while (this.started) {
      this.Validate(MARKET);
      /* const status: IMensaje[] = [
        { Color: "red", Texto: "Hola" },
        { Color: "green", Texto: "Carola" },
        { Color: "gray", Texto: "Como estas?" },
      ];
      await Status(2000, status); */
    }
  }

  public static async Validate(MARKET: string) {
    this.candles = await BinanceFutures.Candles(MARKET, PERIODO);
    this.bollinger = BollingerBands.Get(
      LONGITUD_INDICADORES,
      this.candles
    );
    this.estocastico = Estocastico.Get(this.candles);
    console.log(this.bollinger);
    console.log(this.bollinger);
    switch (this.estado) {
      case ESTADO.ESPERA:
                
        break;
    
      default:
        break;
    }
  }

  public static BuscarEntrada() {
    if(this.estocastico.K > 80 && this.estocastico.K <= this.estocastico.D){
      if(this.candles[this.candles.length -1][Candle.High]>= this.bollinger.Upper){
        console.log()
      }
    }
  }
}

//CERRAR UN SHORT POR ABAJO DEL 50 ESTOCASTICO -> CRUCE
//CERRAR UN LONG POR ARRIBA DEL 550 ESTOCASTICO -> CRUCE
//ABRIR UN SHORT CORTE Y CRUCE ABAJO DEL 20
//ABRIR UN LONG CORTE Y CRUCE ARRIBA DEL 80
var currentdate = new Date(); 
var datetime = "Last Sync: " + currentdate.getDate() + "/"
                + (currentdate.getMonth()+1)  + "/" 
                + currentdate.getFullYear() + " @ "  
                + currentdate.getHours() + ":"  
                + currentdate.getMinutes() + ":" 
                + currentdate.getSeconds();