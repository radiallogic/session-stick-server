
import { DataMessage } from "../types/data.types";

export function gustSpeed( msgs: DataMessage[]){
    let sum = 0
    for(let i = 0; i<msgs.length; i++){

        const msg = msgs[i];
        if(new Date(msg.time).getTime() < new Date( Date.now() - 15 * 60000).getTime() 
        && msg.average_speed != undefined){
            sum += msg.average_speed
        }
        
    }

    return sum / msgs.length;
}