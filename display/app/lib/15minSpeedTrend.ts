
import { DataMessage } from "../types/data.types";

export function speedTrend( msgs: DataMessage[]){

    let deltas = []    

    for( let i = 0; i < msgs.length; i++ ){
    
        let current = msgs[i];
        let next  = msgs[i+1];

        let fifteenMinsAgo =  new Date( Date.now() - 15 * 60000).getTime()

        if( next != undefined && 
            current.average_speed != undefined 
                && next.average_speed != undefined
                    && new Date(current.time).getTime() > fifteenMinsAgo
                        && new Date(next.time).getTime() > fifteenMinsAgo 
        ){
            let delta = current.average_speed - next.average_speed
            deltas.push(delta);
        }
    }

    let sum = 0;
    for( let z = 0; z < deltas.length; z++){
        sum += deltas[z];
    }

    return sum;
}