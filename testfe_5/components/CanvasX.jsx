import React from "react";
export default class CanvasX extends React.Component {
  constructor(props) {
    super(props);
    this.handleMouseMove = this.handleMouseMove.bind(this);
    this.handleClick = this.handleClick.bind(this);
    //this.handleAddRegionClick = this.handleAddRegionClick(this);

    //this.clickDrawHex = this.clickDrawHex.bind(this);
    //this.handelExpandClick = this.handelExpandClick.bind(this);
    //let hexParametres = this.getHexParametres();
    this.state = {
      canvasSize: {
        canvasWidth: 1600,
        canvasHeight: 1700,
      },
      hexSize: 40,
      hexOrigin: { x: 200, y: 100 },
      recieveColumn: [9, 10, 19, 0, 9],
      recieveRow: [9, 3, 8, 0, 5],

      currentHex: { q: 0, r: 0, x: 0, y: 0 },
      //hexParametres: hexParametres,
      playerPosition: { q: 0, r: 0, x: 400, y: 300 },
      obstacles: [],
      frontier: [],
      cameFrom: {},
    };
  }
  // componentWillMount() {
  //   let hexParametres = this.getHexParametres();

  //   this.setState({
  //     hexParametres: hexParametres,
  //   });
  // }

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

  drawRecieveHex(canvasID, row, col) {
    const r = row;
    const q = col;

    for (let i = 0; i < r.length; i++) {
      var p = Math.ceil(q[i] / 2);
      const { x, y } = this.hexToPixel(this.Hex(q[i], r[i] - p));
      this.drawHex(canvasID, this.Point(x, y), 2, "black", "blue");
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
        this.drawHex(canvasID, this.Point(x, y), 2, "black", "grey");
        this.drawHexCoordinates(canvasID, this.Point(x, y), this.Hex(q, r));
      }
    }
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
    console.log(this.state.currentHex.r, this.state.currentHex.q);
  }

  handleAddRegionClick = () => {
    const q = this.state.recieveColumn;
    const r = this.state.recieveRow;
    this.drawRecieveHex(this.canvasHex, r, q);
  }

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
          Construction Plan
        </button>
        <button className="Goldbutton">Gold</button>
        <button className="Time" onClick={() => alert("No")}>
          Time
        </button>
        <button className="Region" onClick={this.handleAddRegionClick}>
          Region
        </button>
      </div>
    );
  }
}
