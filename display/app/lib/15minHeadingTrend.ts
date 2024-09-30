
import { DataMessage } from "../types/data.types";

export function headingTrend( msgs: DataMessage[]){
    
    let deltas = []    

    for( let i = 0; i < msgs.length; i++ ){
    
        let current = msgs[i];
        let next  = msgs[i+1];

        let fifteenMinsAgo =  new Date( Date.now() - 15 * 60000).getTime()

        if(next != undefined && 
            current.heading != undefined && next.heading != undefined
                && new Date(current.time).getTime() > fifteenMinsAgo
                    && new Date(next.time).getTime() > fifteenMinsAgo
        ){
            let delta = current.heading - next.heading
            deltas.push(delta);
        }
    }

    let sum = 0;
    for( let z = 0; z < deltas.length; z++){
        sum += deltas[z];
    }

    return sum;
}