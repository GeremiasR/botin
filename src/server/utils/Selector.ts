import { Breakout } from "../estrategias/Futuros/Breakout";

export async function Selector(code: number) {
  const MARKET1: string = process.argv[2];
  const MARKET2: string = process.argv[3];
  const MARKET: string = MARKET1 + MARKET2;
  
  switch (code) {
    case 1:
      //TODO SCALPING
      break;
    case 2:
      await Breakout.Start(MARKET);
      break;
    default:
      console.log("codigo de script incorrecto");
      break;
  }
}
