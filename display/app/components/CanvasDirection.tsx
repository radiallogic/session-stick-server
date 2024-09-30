"use client" 

import React, { useState, useEffect, useRef } from "react";

interface Props {
  headingAvg: number[]
  heading: number
}

const CanvasDirection = (props: Props) => {

  console.log(props)

  const [pieStart, setPieStart] = useState<number>(props.headingAvg[0]);
  const [pieEnd, setPieEnd] = useState<number>(props.headingAvg[1]);
  const [lineAngle, setLineAngle] = useState<number>(props.heading);
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  const radius = 100;
  const canvasSize = 400;

  useEffect(() => {
    draw();
  }, [pieStart, pieEnd, lineAngle]);

  const draw = () => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    
    const ctx = canvas.getContext("2d");
    if (!ctx) return;
    
    const centerX = canvas.width / 2;
    const centerY = canvas.height / 2;

    // Clear the canvas
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    // Draw background circle
    drawBackgroundCircle(ctx, centerX, centerY);

    // Draw pie slice
    drawPieSlice(ctx, centerX, centerY, pieStart, pieEnd);

    // Draw radius line
    drawRadiusLine(ctx, centerX, centerY, lineAngle);
  };

  const drawBackgroundCircle = (ctx: CanvasRenderingContext2D, x: number, y: number) => {
    ctx.beginPath();
    ctx.arc(x, y, radius, 0, 2 * Math.PI, false);
    ctx.fillStyle = "#89A3B6";
    ctx.fill();
  };

  const drawPieSlice = (ctx: CanvasRenderingContext2D, x: number, y: number, startAngle:number, endAngle:number) => {
    ctx.beginPath();
    ctx.moveTo(x, y);
    console.log(startAngle, endAngle)
    ctx.arc(x, y, radius, startAngle, endAngle);
    ctx.closePath();
    ctx.fillStyle = "#29465B";
    ctx.fill();
  };

  const drawRadiusLine = (ctx: CanvasRenderingContext2D, x: number, y: number, angle: number) => {
    const radians = (Math.PI / 180) * angle;
    const endX = x + radius * Math.cos(radians);
    const endY = y + radius * Math.sin(radians);

    ctx.beginPath();
    ctx.moveTo(x, y);
    ctx.lineTo(endX, endY);
    ctx.strokeStyle = "white";
    ctx.lineWidth = 2;
    ctx.stroke();
  };

  return (
      <canvas ref={canvasRef} width={canvasSize} height={canvasSize} />
  );
};

export default CanvasDirection;
