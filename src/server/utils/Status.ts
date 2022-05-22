import { logColor } from "./log";

export interface IMensaje {
    Color: string;
    Texto: string;
}

export function Status(ms: number, mensajes: IMensaje[]) {
    //console.clear();
    const newMensaje : IMensaje = {
        Color: "gray",
        Texto: getDateFormated()
    }
    mensajes.unshift(newMensaje)
    mensajes.map(mensaje => logColor(mensaje.Color, mensaje.Texto))
    return new Promise(resolve => setTimeout(resolve, ms));
}

export function getDateFormated(){
    const currentdate = new Date(); 
    return "Status at: " + currentdate.getDate() + "/"
                    + (currentdate.getMonth()+1)  + "/" 
                    + currentdate.getFullYear() + " @ "  
                    + currentdate.getHours() + ":"  
                    + currentdate.getMinutes() + ":" 
                    + currentdate.getSeconds();
}


