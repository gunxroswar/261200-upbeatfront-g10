import react from "react";

export default function Hex() {

  const drawHex = ()=>{
    for (let i = 0; i < 6; i++) {
        let start = this.getHexCornerCoord(center, i);
        let end = this.getHexCornerCoord(center, i + 1);
        this.fillHex(canvasID, center, fillColor);
        this.drawLine(canvasID, start, end, lineWidth, lineColor);
      }
  }  
  const drawLine = (canvasID, start, end, lineWidth, lineColor) => {
    const ctx = canvasID.getContext("2d");
    ctx.beginPath();
    ctx.moveTo(start.x, start.y);
    ctx.strokeStyle = lineColor;
    ctx.lineWidth = lineWidth;
    ctx.lineTo(end.x, end.y);
    ctx.stroke();
    ctx.closePath();
  };

  return (
    <div>
      <div>
        <canvas ref={(canvasHex) => (this.canvasHex = canvasHex)}></canvas>
      </div>
    </div>
  );
}
