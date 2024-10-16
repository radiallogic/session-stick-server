import React, { useRef, useEffect } from 'react';
import * as d3 from 'd3';

interface SparklineProps {
  data1: number[];
  data2: number[];
  width: number;
  height: number;
}

const Sparkline = ({ data1, data2, width, height }: SparklineProps) => {
  const ref = useRef<SVGSVGElement>(null);

  useEffect(() => {
    if (data1.length === 0 || data2.length === 0) return;

    const svg = d3.select(ref.current);
    svg.selectAll('*').remove(); // Clear any previous content

    // Create scales
    const xScale = d3
      .scaleLinear()
      .domain([0, data1.length - 1])
      .range([0, width]);

    const yScale = d3
      .scaleLinear()
      .domain([d3.min([...data1, ...data2]) || 0, d3.max([...data1, ...data2]) || 0])
      .range([height, 0]);

    // Create line generators
    const lineGenerator1 = d3
      .line<number>()
      .x((d, i) => xScale(i))
      .y(d => yScale(d))
      .curve(d3.curveBasis); // Smooth line

    const lineGenerator2 = d3
      .line<number>()
      .x((d, i) => xScale(i))
      .y(d => yScale(d))
      .curve(d3.curveBasis); // Smooth line

    // Append the first line
    svg
      .append('path')
      .datum(data1)
      .attr('fill', 'none')
      .attr('stroke', 'steelblue')
      .attr('stroke-width', 1.5)
      .attr('d', lineGenerator1);

    // Append the second line
    svg
      .append('path')
      .datum(data2)
      .attr('fill', 'none')
      .attr('stroke', 'tomato')
      .attr('stroke-width', 1.5)
      .attr('d', lineGenerator2);

  }, [data1, data2, width, height]);

  return <svg ref={ref} width={width} height={height} />;
};

export default Sparkline;
