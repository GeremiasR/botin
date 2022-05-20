import BollingerBands from "../../indicadores/BollingerBands";
import Estocastico from "../../indicadores/Estocastico";
import MediaMovil from "../../indicadores/MediaMovil";
import { IBollingerBands } from "../../Modelos/BollingerBands.interface";
import { Candle } from "../../Modelos/Candle.enum";
import { IEstocastico } from "../../Modelos/Estocastico.interface";
import { IOrden } from "../../Modelos/Orden";
import { BinanceFutures } from "../../services/BinanceFutures";
import { IMensaje, Status } from "../../utils/Status";
//https://www.ig.com/es/estrategias-de-trading/bandas-de-bollinger---que-son---como-se-utilizan-en-trading--190204
//https://admiralmarkets.com/es/education/articles/forex-indicators/indicador-estocastico

const PERIODO: string = "1m";
const LONGITUD_INDICADORES: number = 20;
const MONTO_ORDEN: number = 0.011;
const APALANCAMIENTO: number = 1;
const TIPO_MARGEN: string = "ISOLATED";
const MARKET: string = "ETHUSDT";

enum ESTADO {
  ESPERA = 0,
  LONG = 1,
  SHORT = 2,
}

export abstract class Breakout {
  static started: boolean;
  static estocastico: IEstocastico;
  static bollinger: IBollingerBands;
  static candles: any[];
  static MARKET: string;
  static ORDEN: IOrden = {
    Id: 12,
    Tipo: ESTADO.LONG,
    Precio_Entrada: 1928,
    Cantidad: 0.011,
  };
  public static async Start() {
    this.MARKET = MARKET;
    await BinanceFutures.Apalancamiento(this.MARKET, APALANCAMIENTO);
    await BinanceFutures.MarginType(this.MARKET, TIPO_MARGEN);
    this.started = true;
    console.log(`Inicializando Bot en ${this.MARKET}`);
    while (this.started) {
      await this.Validate();
    }
  }

  public static async Validate() {
    if (this.ORDEN.Tipo && this.ORDEN.Id) {
      //BUSCAR SALIDA
      await this.BuscarSalida();
    } else {
      await this.BuscarEntrada();
    }
  }

  public static async BuscarEntrada() {
    this.candles = await BinanceFutures.Candles(this.MARKET, PERIODO);
    this.bollinger = BollingerBands.Get(LONGITUD_INDICADORES, this.candles);
    this.estocastico = Estocastico.Get(this.candles);
    const status: IMensaje[] = [];
    status.push({
      Color: "gray",
      Texto: `UpperBand:${this.bollinger.Upper.toFixed(
        2
      )} / LowerBand:${this.bollinger.Lower.toFixed(2)} - Bollinger Bands`,
    });
    status.push({
      Color: "gray",
      Texto: `K:${this.estocastico.K.toFixed(
        2
      )} / D:${this.estocastico.D.toFixed(2)} - Estocastico`,
    });
    status.push({
      Color: "gray",
      Texto: `High:${
        this.candles[this.candles.length - 1][Candle.High]
      } / Low:${this.candles[this.candles.length - 1][Candle.Low]} / Price:${
        this.candles[this.candles.length - 1][Candle.Close]
      }`,
    });
    if (this.estocastico.K > 80 && this.estocastico.K <= this.estocastico.D) {
      if (
        this.candles[this.candles.length - 1][Candle.High] >=
        this.bollinger.Upper
      ) {
        //HACER SHORT
        this.ORDEN.Tipo = ESTADO.SHORT;
        status.push({
          Color: "green",
          Texto: `${this.ORDEN.Tipo} - operacion de entrada`,
        });
      }
    } else {
      if (this.estocastico.K < 20 && this.estocastico.K >= this.estocastico.D) {
        if (
          this.candles[this.candles.length - 1][Candle.Low] <=
          this.bollinger.Lower
        ) {
          //HACER LONG
          this.ORDEN.Tipo = ESTADO.LONG;
          status.push({
            Color: "green",
            Texto: `${this.ORDEN.Tipo} - operacion de entrada`,
          });
        }
      }
    }
    if (!this.ORDEN.Tipo) {
      status.push({
        Color: "red",
        Texto: `${this.ORDEN.Tipo} - Esperando entrada`,
      });
    }
    await Status(20000, status);
  }

  public static async BuscarSalida() {
    this.candles = await BinanceFutures.Candles(this.MARKET, PERIODO);
    this.bollinger = BollingerBands.Get(LONGITUD_INDICADORES, this.candles);
    this.estocastico = Estocastico.Get(this.candles);
    if ((this.ORDEN.Tipo = ESTADO.LONG)) {
      if (this.estocastico.K > 75 && this.estocastico.K <= this.estocastico.D) {
        //TAKE PROFIT
        console.log(
          "TP en",
          this.candles[this.candles.length - 1][Candle.Close]
        );
      }
      if (
        parseFloat(this.candles[this.candles.length - 1][Candle.Close]) <=
        this.ORDEN.Precio_Entrada * 0.998
      ) {
        //STOP LOSS
        console.log(
          "SL en",
          this.candles[this.candles.length - 1][Candle.Close],
          this.ORDEN.Precio_Entrada
        );
      }
    }
    if ((this.ORDEN.Tipo = ESTADO.SHORT)) {
      if (this.estocastico.K < 25 && this.estocastico.K >= this.estocastico.D) {
        //TAKE PROFIT
        console.log(
          "TP en",
          this.candles[this.candles.length - 1][Candle.Close]
        );
      }
      if (
        parseFloat(this.candles[this.candles.length - 1][Candle.Close]) >=
        this.ORDEN.Precio_Entrada * 1.002
      ) {
        //STOP LOSS
        console.log(
          "SL en",
          this.candles[this.candles.length - 1][Candle.Close],
          this.ORDEN.Precio_Entrada
        );
      }
    }
    await Status(5000, []);
  }
}

//CERRAR UN SHORT POR ABAJO DEL 50 ESTOCASTICO -> CRUCE
//CERRAR UN LONG POR ARRIBA DEL 550 ESTOCASTICO -> CRUCE
//ABRIR UN SHORT CORTE Y CRUCE ABAJO DEL 20
//ABRIR UN LONG CORTE Y CRUCE ARRIBA DEL 80
