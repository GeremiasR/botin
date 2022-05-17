import { logColor } from "./log";

export interface IMensaje {
    Color: string;
    Texto: string;
}

export function Status(ms: number, mensajes: IMensaje[]) {
    mensajes.map(mensaje => logColor(mensaje.Color, mensaje.Texto))
    return new Promise(resolve => setTimeout(resolve, ms));
}
