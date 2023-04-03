import React from "react";
import Link from "next/link";
export default class Canvas extends React.Component {
  constructor(props) {
    super(props);
    this.handleMouseMove = this.handleMouseMove.bind(this);
    this.handleClick = this.handleClick.bind(this);
    this.handleZoomIn = this.handleZoomIn.bind(this);
    this.handleZoomOut = this.handleZoomOut.bind(this);

    this.state = {
      canvasSize: {
        canvasWidth: 1600,
        canvasHeight: 1700,
      },
      hexSize: 40,
      hexOrigin: { x: 200, y: 100 },
      recieveColumn: [9, 10, 19, 0, 9],
      recieveRow: [9, 3, 8, 0, 5],
      hexagons: [],
      currentHex: { q: 0, r: 0, x: 0, y: 0 },
      //hexParametres: hexParametres,
      playerPosition: { q: 0, r: 0, x: 400, y: 300 },
      obstacles: [],
      frontier: [],
      cameFrom: {},
      isClick: false,
      seconds: 1000,
      isActive: true,
    };
  }

  componentDidMount() {
    const { canvasWidth, canvasHeight } = this.state.canvasSize;
    this.canvasHex.width = canvasWidth;
    this.canvasHex.height = canvasHeight;
    this.canvasInteraction.width = canvasWidth;
    this.canvasInteraction.height = canvasHeight;
    this.cavasView.width = canvasWidth;
    this.cavasView.height = canvasHeight;
    this.getCanvasPosition(this.canvasInteraction);
    // this.drawHex(
    //   this.canvasInteraction,
    //   this.Point(this.state.playerPosition.x, this.state.playerPosition.y),
    //   1,
    //   "grey",
    //   "blue",
    //   0.2
    // );
    this.drawHexes(this.canvasHex);
    // this.drawRecieveHex(
    //   this.canvasHex,
    //   this.state.recieveRow,
    //   this.state.recieveColumn
    // );
    this.Timer();
 
  }

  shouldComponentUpdate(nextProps, nextState) {
    if (nextState.currentHex !== this.state.currentHex) {
      const { q, r, x, y } = nextState.currentHex;
      const { canvasWidth, canvasHeight } = this.state.canvasSize;
      const ctx = this.canvasInteraction.getContext("2d");
      ctx.clearRect(0, 0, canvasWidth, canvasHeight);
      //this.drawNeighbors(this.Hex(q, r));
      let currentDistanceLine = nextState.currentDistanceLine;
      // for (let i = 0; i < nextState.currentDistanceLine.length; i++) {
      //   if (i == 0) {
      //     this.drawHex(
      //       this.canvasInteraction,
      //       this.Point(
      //         currentDistanceLine[i].x,
      //         currentDistanceLine[i].y,
      //         2,
      //         "black",
      //         "red",
      //
      //       )
      //     );
      //   } else {
      //     this.drawHex(
      //       this.canvasInteraction,
      //       this.Point(
      //         currentDistanceLine[i].x,
      //         currentDistanceLine[i].y,
      //         "black",
      //         2,
      //         "grey"
      //       )
      //     );
      //   }
      //   this.drawHex(
      //     this.canvasInteraction,
      //     this.Point(
      //       currentDistanceLine[i].x,
      //       currentDistanceLine[i].y,
      //       2 ,"grey","black"
      //
      //     )
      //   );
      // }
      nextState.obstacles.map((l) => {
        const { q, r } = JSON.parse(l);
        const { x, y } = this.hexToPixel(this.Hex(q, r));
        this.drawHex(
          this.canvasInteraction,
          this.Point(x, y),
          7,
          "cyan",
          "black"
        );
      });
      this.drawHex(
        this.canvasInteraction,
        this.Point(x, y),
        7,
        "cyan",
        "yellow"
      );
      return true;
    }

    // if (nextState.cameFrom !== this.state.cameFrom) {
    //   const { canvasWidth, canvasHeight } = this.state.canvasSize;
    //   const ctx = this.canvasView.getContext("2d");
    //   ctx.clearRect(0, 0, canvasWidth, canvasHeight);
    //   for (let l in nextState.cameFrom) {
    //     const { q, r } = JSON.parse(l);
    //     const { x, y } = this.hexToPixel(this.Hex(q, r));
    //     this.drawHex(this.cavasView, this.Point(x, y), 1, "black", "green");
    //   }
    //   return true;
    // }

    return false;
  }

  drawRecieveHex(canvasID, row, col, isClick) {
    const r = row;
    const q = col;

    for (let i = 0; i < r.length; i++) {
      var p = Math.ceil(q[i] / 2);
      const { x, y } = this.hexToPixel(this.Hex(q[i], r[i] - p));
      if (isClick == true) {
        this.drawHex(canvasID, this.Point(x, y), 2, "black", "blue");
      } //else this.deleteHex(canvasID, q[i], r[i]);
    }
    // const { x, y } = this.hexToPixel(this.Hex(7, 9 - p));
    // this.drawHex(canvasID, this.Point(x, y), 2, "black", "blue");
  }

  drawHexes(canvasID) {
    var p = 0;
    for (let q = 0; q < 20; q++) {
      if (q % 2 == 1 && q !== 0) {
        p++;
      }
      for (let r = 0; r < 10; r++) {
        const { x, y } = this.hexToPixel(this.Hex(q, r - p));
        const hex = { q: q, r: r, x: x, y: y }; // create hexagon object
        this.state.hexagons.push(hex);
        this.drawHex(canvasID, this.Point(x, y), 2, "black", "grey");
        this.drawHexCoordinates(canvasID, this.Point(x, y), this.Hex(q, r));
      }
    }
  }
  deleteHex(canvasID, q, r) {
    this.state.hexagons = this.state.hexagons.filter(
      (hex) => !(hex.q === q && hex.r === r)
    ); // remove hexagon from list

    const context = canvasID.getContext("2d");
    context.clearRect(0, 0, context.width, context.height);

    // redraw remaining hexagons
    this.state.hexagons.forEach((hex) => {
      this.drawHex(canvasID, this.Point(hex.x, hex.y), 2, "black", "grey");
      this.drawHexCoordinates(
        canvasID,
        this.Point(hex.x, hex.y),
        this.Hex(hex.q, hex.r)
      );
    });
  }

  drawHex(canvasID, center, lineWidth, lineColor, fillColor) {
    for (let i = 0; i < 6; i++) {
      let start = this.getHexCornerCoord(center, i);
      let end = this.getHexCornerCoord(center, i + 1);
      this.fillHex(canvasID, center, fillColor);
      this.drawLine(canvasID, start, end, lineWidth, lineColor);
    }
  }

  getHexCornerCoord(center, i) {
    let angle_deg = 60 * i;
    let angle_rad = (Math.PI / 180) * angle_deg;
    let x = center.x + this.state.hexSize * Math.cos(angle_rad);
    let y = center.y + this.state.hexSize * Math.sin(angle_rad);
    return this.Point(x, y);
  }

  getCanvasPosition(canvasId) {
    let rect = canvasId.getBoundingClientRect();
    this.setState({
      canvasPosition: {
        left: rect.left,
        right: rect.right,
        top: rect.top,
        bottom: rect.bottom,
      },
    });
  }

  // getHexParametres() {
  //   let hexHeight = this.state.hexSize * 2;
  //   let hexWidth = (Math.sqrt(3) / 2) * hexHeight;
  //   let vertDist = hexHeight * (3 / 4);
  //   let horizDist = hexWidth;
  //   return { hexWidth, hexHeight, vertDist, horizDist };
  // }

  Point(x, y) {
    return { x: x, y: y };
  }

  Hex(q, r) {
    return { q: q, r: r };
  }

  drawLine(canvasID, start, end, lineWidth, lineColor) {
    const ctx = canvasID.getContext("2d");
    ctx.beginPath();
    ctx.moveTo(start.x, start.y);
    ctx.strokeStyle = lineColor;
    ctx.lineWidth = lineWidth;
    ctx.lineTo(end.x, end.y);
    ctx.stroke();
    ctx.closePath();
  }

  fillHex(canvasID, center, fillColor) {
    let c0 = this.getHexCornerCoord(center, 0);
    let c1 = this.getHexCornerCoord(center, 1);
    let c2 = this.getHexCornerCoord(center, 2);
    let c3 = this.getHexCornerCoord(center, 3);
    let c4 = this.getHexCornerCoord(center, 4);
    let c5 = this.getHexCornerCoord(center, 5);
    const ctx = canvasID.getContext("2d");
    ctx.beginPath();
    ctx.fillStyle = fillColor;
    ctx.globalAlpha = 0.1;
    ctx.moveTo(c0.x, c0.y);
    ctx.lineTo(c1.x, c1.y);
    ctx.lineTo(c2.x, c2.y);
    ctx.lineTo(c3.x, c3.y);
    ctx.lineTo(c4.x, c4.y);
    ctx.lineTo(c5.x, c5.y);
    ctx.closePath();
    ctx.fill();
  }

  drawHexCoordinates(canvasID, center, h) {
    const ctx = canvasID.getContext("2d");
    ctx.fillText(h.q, center.x + 7, center.y + 3);
    ctx.fillText(h.r, center.x - 10, center.y + 3);

    ctx.fillStyle = "green";
    ctx.fill;
  }

  hexToPixel(hex) {
    let hexOrigin = this.state.hexOrigin;
    let x = this.state.hexSize * ((3 / 2) * hex.q) + hexOrigin.x;
    let y =
      this.state.hexSize * ((Math.sqrt(3) / 2) * hex.q + Math.sqrt(3) * hex.r) +
      hexOrigin.y;
    return this.Point(x, y);
  }

  pixelToHex(point) {
    let size = this.state.hexSize;
    let origin = this.state.hexOrigin;
    let q = ((2 / 3) * (point.x - origin.x)) / size;
    let r =
      ((-1 / 3) * (point.x - origin.x) +
        (Math.sqrt(3) / 3) * (point.y - origin.y)) /
      size;
    return this.Hex(q, r);
  }

  cubeDirection(direction) {
    const cubeDirection = [
      this.Hex(1, 0),
      this.Hex(1, -1),
      this.Hex(0, -1),
      this.Hex(-1, 0),
      this.Hex(-1, +1),
      this.Hex(0, 1),
    ];

    return cubeDirection[direction];
  }

  cubeAdd(a, b) {
    return this.Hex(a.q + b.q, a.r + b.r);
  }

  cubeSubstract(hexA, hexB) {
    return this.Hex(hexA.q - hexB.q, hexA.r - hexB.r);
  }

  getCubeNeighbor(h, direction) {
    return this.cubeAdd(h, this.cubeDirection(direction));
  }

  // getNeighbors(h) {
  //   var arr = [];
  //   for (let i = 0; i < 6; i++) {
  //     const { q, r } = this.getCubeNeighbor(this.Hex(h.q, h.r), i);
  //     arr.push(this.Hex(q, r));
  //   }
  //   return arr;
  // }

  cubeRound(frac) {
    let q = Math.round(frac.q);
    let r = Math.round(frac.r);

    return this.Hex(q, r);
  }

  getDistanceLine(hexA, hexB) {
    let dist = this.cubeDistances(hexA, hexB);

    var arr = [];
    for (let i = 0; i <= dist; i++) {
      let center = this.hexToPixel(
        this.cubeRound(this.cubeLinearInt(hexA, hexB, 1.0 / (dist * i)))
      );
      arr = [].concat(arr, center);
    }
    this.setState({
      currentDistanceLine: arr,
    });
  }

  cubeDistances(hexA, hexB) {
    const { q, r } = this.cubeSubstract(hexA, hexB);
    let dist = Math.abs(q) + Math.abs(r) / 2;
    return dist;
  }

  doubleWidthDistance(hexA, hexB) {
    const { q, r } = this.cubeSubstract(hexA, hexB);
    return r + Math.max(0, Math.abs(q - r));
  }
  doubleHeightDistance(hexA, hexB) {
    const { q, r } = this.cubeSubstract(hexA, hexB);
    return r + Math.max(0, Math.abs(q - r));
  }

  cubeLinearInt(hexA, hexB, t) {
    return this.Hex(
      this.linearInt(hexA.q, hexB.q, t),
      this.linearInt(hexA.r, hexB.r, t)
    );
  }

  linearInt(a, b, t) {
    return a + (b - a) * t;
  }

  drawNeighbors(h) {
    for (let i = 0; i < 6; i++) {
      const { q, r } = this.getCubeNeighbor(this.Hex(h.q, h.r), i);
      const { x, y } = this.hexToPixel(this.Hex(q, r));
      this.drawHex(this.canvasInteraction, this.Point(x, y), 2, "red", "black");
    }
  }

  handleMouseMove(e) {
    const { left, right, top, bottom } = this.state.canvasPosition;
    let offsetX = e.pageX - left;
    let offsetY = e.pageY - top;
    const { q, r } = this.cubeRound(
      this.pixelToHex(this.Point(offsetX, offsetY))
    );
    const { x, y } = this.hexToPixel(this.Hex(q, r));
    let playerPosition = this.state.playerPosition;
    this.getDistanceLine(this.Hex(0, 0), this.Hex(q, r));
    //console.log(this.state.currentDistanceLine);

    this.drawHex(this.canvasInteraction, this.Point(x, y), 7, "cyan", "grey");
    let p = Math.ceil(q / 2);
    this.setState({
      currentHex: { q, r, x, y },
    });
  }

  handleClick(e) {
    const { left, right, top, bottom } = this.state.canvasPosition;
    let offsetX = e.pageX - left;
    let offsetY = e.pageY - top;
    const { q, r } = this.cubeRound(
      this.pixelToHex(this.Point(offsetX, offsetY))
    );
    const { x, y } = this.hexToPixel(this.Hex(q, r));
    let playerPosition = this.state.playerPosition;
    this.getDistanceLine(this.Hex(0, 0), this.Hex(q, r));
    //console.log(this.state.currentDistanceLine);
    //this.addObstacle();
    let p = Math.ceil(this.state.currentHex.q / 2);
    console.log(this.state.currentHex.r + p, this.state.currentHex.q);
  }

  handleAddRegionClick = () => {
    const q = this.state.recieveColumn;
    const r = this.state.recieveRow;
    const isClick = !this.state.isClick;
    this.drawRecieveHex(this.canvasHex, r, q, isClick);
    this.setState({
      isClick: isClick,
    });
  };

  addObstacle() {
    const { q, r } = this.state.currentHex;
    let obstacles = this.state.obstacles;
    if (!obstacles.includes(JSON.stringify(this.Hex(q, r)))) {
      obstacles = [].concat(obstacles, JSON.stringify(this.state.currentHex));
    } else {
      obstacles.map((l, i) => {
        if (l == JSON.stringify(this.Hex(q, r))) {
          obstacles = obstacles.slice(0, i).concat(obstacles.slice(i + 1));
        }
      });
    }

    this.setState({
      obstacles: obstacles,
    });
  }

  // set isActive to true

  Timer() {
    let interval = null;
    const { isActive, seconds } = this.state; // destructure state object
    if (isActive) {
      interval = setInterval(() => {
        this.setState((prevState) => {
          if (prevState.seconds === 0) {
            clearInterval(interval); // clear the interval
            return { seconds: 0, isActive: false }; // update state
          } else {
            return { seconds: prevState.seconds - 1 }; // update state
          }
        });
      }, 1000);
    } else if (!isActive && seconds !== 0) {
      clearInterval(interval);
    }
    return () => clearInterval(interval); // cleanup function
  }

  handleZoomIn() {
    // Fetching current height and width
    const { width, height } = this.state.canvasSize;
    // Increase dimension(Zooming)
    this.setState({
      canvasWidth: width + 10,
      canvasHeight: height + 10,
    });
  }

  handleZoomOut() {
    // Assigning original height and width
    this.setState({
      canvasWidth: 1600,
      canvasHeight: 900,
    });
  }

  // handelExpandClick() {
  //   var frontier = this.state.frontier;
  //   var cameFrom = this.state.cameFrom;
  //   if (frontier == 0) {
  //     frontier.push(this.Hex(0, 0));
  //     cameFrom[JSON.stringify(this.Hex(0, 0))] = JSON.stringify(null);
  //   }
  //   let n = 0;
  //   while (n < 1) {
  //     var current = frontier.shift();
  //     let arr = this.getNeighbors(current);
  //     arr.map((l) => {
  //       if (
  //         !cameFrom.hasOwnProperty(JSON.stringify(l)) &&
  //         !this.state.obstacles.includes(JSON.stringify(l))
  //       ) {
  //         frontier.push(l);
  //         cameFrom[JSON.stringify(l)] = JSON.stringify(current);
  //       }
  //     });
  //     n++;
  //   }

  //   cameFrom = Object.assign({}, this.cameFrom);
  //   this.setState({
  //     cameFrom: cameFrom,
  //   });
  // }
  // clickDrawHex() {
  //   const { q, r } = { q: -1, r: 0 };
  //   const { x, y } = this.hexToPixel(this.Hex(q, r));
  //   this.drawHex(this.canvasButton, this.Point(x, y), 2, "black", "cyan");
  // }

  render() {
    return (
      <div>
        <div>
          <canvas ref={(canvasHex) => (this.canvasHex = canvasHex)}></canvas>
          <canvas
            ref={(canvasCoordiantes) =>
              (this.canvasCoordiantes = canvasCoordiantes)
            }
          ></canvas>
          <canvas ref={(canvasView) => (this.cavasView = canvasView)}></canvas>
          <canvas
            ref={(canvasInteraction) =>
              (this.canvasInteraction = canvasInteraction)
            }
            onMouseMove={this.handleMouseMove}
            onClick={this.handleClick}
          ></canvas>
          <button
            ref={(canvasButton) => (this.canvasButton = canvasButton)}
            className="expandButton"
            onClick={this.clickDrawHex}
          >
            <Link href="/Construction">Construction Plan</Link>
          </button>
          <button className="Goldbutton">Gold</button>
          <button className="Time" onClick={() => alert("No")}>
            <div className="app">
              <p style={{ color: "white" }}>{this.state.seconds}s</p>
            </div>
          </button>
          <button className="Region" onClick={this.handleAddRegionClick}>
            Region
          </button>
        </div>
        <div>
          <button type="button" onClick={this.handleZoomIn}>
            Zoom-In
          </button>

          <button type="button" onClick={this.handleZoomOut}>
            Zoom-Out
          </button>
        </div>
      </div>
    );
  }
}
