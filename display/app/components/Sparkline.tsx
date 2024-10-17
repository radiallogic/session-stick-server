import React, { useRef, useEffect } from 'react';
import { DataMessage } from '@/app/types/data.types';
import * as d3 from 'd3';
import { gustSpeed } from '../lib/15minGustSpeed';

interface SparklineProps {
    records: DataMessage[]
    width: number;
    height: number;
}


const Sparkline = ({ records, width, height}: SparklineProps) => {
  const ref = useRef<SVGSVGElement>(null);

  // min and max datetime from records 
  const minTime = records[0].time;
  const maxTime = records[records.length -1].time
 
  const maxWind = records.reduce((max:number, item: DataMessage):number => {
    if(item.gust_speed ){
      if( item.gust_speed > max){
        return item.gust_speed
      }
    }
    return max
  } , -Infinity);

  const minWind = records.reduce((min:number, item: DataMessage):number => {
    if(item.average_speed ){
      if( item.average_speed < min){
        return item.average_speed
      }
    }
    return min
  } , -Infinity);


  useEffect(() => {
    const svg = d3.select(ref.current);
    svg.selectAll('*').remove(); // Clear any previous content

    // Create scales
    const xScale = d3
      .scaleTime()
      .domain([minTime, maxTime])
      .range([0, width]);

    const yScale = d3
      .scaleLinear()
      .domain([minWind, maxWind])
      .range([height, 0]);

    // Create line generators
    const lineGenerator1 = d3
      .line<DataMessage>()
      .x((d, i) => xScale(d.time))
      .y(d => yScale( d.gust_speed? d.gust_speed : 0 ))
      .curve(d3.curveBasis); // Smooth line

    const lineGenerator2 = d3
    .line<DataMessage>()
      .x((d, i) => xScale(d.time))
      .y(d => yScale(d.average_speed? d.average_speed : 0))
      .curve(d3.curveBasis); // Smooth line

    // Append the first line
    svg
      .append('path')
      .datum(records)
      .attr('fill', 'none')
      .attr('stroke', 'steelblue')
      .attr('stroke-width', 1.5)
      .attr('d', lineGenerator1);

    // Append the second line
    svg
      .append('path')
      .datum(records)
      .attr('fill', 'none')
      .attr('stroke', 'tomato')
      .attr('stroke-width', 1.5)
      .attr('d', lineGenerator2);

  }, [records, width, height]);

  return <svg ref={ref} width={width} height={height} />;
};

export default Sparkline;
