// "use client" 
import {useState} from 'react'

import { DataMessage } from '@/app/types/data.types';

import {averageHeading} from "../lib/15minAverageHeading";
import {headingTrend} from "../lib/15minHeadingTrend";
import {averageSpeed} from "../lib/15minAverageSpeed";
import {speedTrend} from "../lib/15minSpeedTrend";

import CanvasDirection from "./CanvasDirection";


interface Props {
    records: DataMessage[]}

 export const DeviceData = (props: Props) => {
    let records = props.records;

    const headingAvg = averageHeading(records);
    const headingT = headingTrend(records);
    const speedAvg = averageSpeed(records);
    const speedT = speedTrend(records);

    let record = records[records.length - 1] || {heading: 0, time: new Date()}

    record.heading = record.heading ?? 0;

    console.log("records", props.records)
    console.log(headingAvg) 


    return (
    <div className='background-white'>
        <CanvasDirection headingAvg={headingAvg} heading={record.heading} />

        <div className="flex space-x-4">
            <div className="w-1/3 h-32 p-4">{speedAvg}</div>
            <div className="w-1/3 h-32 p-4">{speedT}</div>
            <div className="w-1/3 h-32 p-4">{headingT}</div>
        </div>


        {/* two Sparkline Charts
        for wind and gust.  */}
    </div>
    )
}
