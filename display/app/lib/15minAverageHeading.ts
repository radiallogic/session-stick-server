import { DataMessage } from "../types/data.types";

export function averageHeading( msgs: DataMessage[]){

    let high = 0
    let low = 0

    for(let i =0;i< msgs.length; i++){
        const msg = msgs[i]

        console.log( new Date(msg.time).getTime(), new Date( Date.now() - 15 * 60000).getTime() )
        if(new Date(msg.time).getTime() > new Date( Date.now() - 15 * 60000).getTime() ){ // newer than 15mins ago
            msg.heading = msg.heading ?? 0;
            // console.log(msg.heading)

            if(msg.heading != 0 ){
                if(high == 0){
                    high = msg.heading
                }
                if(low == 0){
                    low = msg.heading
                }
            }

            if(msg.heading > high){
                console.log('here high', msg.heading, high )
                high = msg.heading
            }
            if(msg.heading < low){
                console.log('here low', msg.heading, low) 
                low = msg.heading
            }
        }else{
            console.log("rejecting row", msg) 
        }
    }

    return [high, low]

}