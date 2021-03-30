export default class ChartController {
  constructor(dataController) {
    
    //coords of 0 in pixels
    this.x0 = 90;
    this.y0 = 440;
    
    //max coords of axises in pixels
    this.maxAxY = 120;
    this.maxAxX = 690;

    dataController.addEventListener("dataChanged", event => {
      const data = event.detail;
      this.drawGraph(data);
    });
  }

  drawGraph(data) {
    const dataY = [];
    const dataX = [];

    //sort data to y value array
    data.forEach(element => {
      dataY.push(element.value);
    });

    //sort data to x value array
    data.forEach(element => {
      dataX.push(element.x);
    });

    this.deleteGraph();

    this.createSvgElement();

    //coords of values in pixels
    const arrY = this.dataToPixelsY(dataY);
    const arrX = this.dataToPixelsX(dataX);

    this.drawYAxis(dataY);
    this.drawXAxis(dataX, arrX);

    this.drawLine(arrX, arrY, dataY);
  }

  createSvgElement() {
    const svg = document.createElementNS("http://www.w3.org/2000/svg", "svg");
    svg.setAttribute("class", "graph");
    document.body.appendChild(svg);
  }

  //method conversion data to pixels for y
  dataToPixelsY(dataY) {
    let { y0 } = this;
    const maxAxY = this.maxAxY;
    const maxar = Math.max(...dataY);
    const minar = Math.min(...dataY);
    const lenAr = maxar - minar;
    const lenY = y0 - maxAxY;
    let k = 0;
    if (lenAr != 0) {
      k = lenY / lenAr;
    } else {
      k = lenY / maxar;
      y0 -= k * minar;
    }
    const arrY = [];
    dataY.forEach(element => {
      arrY.push(y0 + k * (minar - element));
    });
    return arrY;
  }

  drawYAxis(dataY) {
    const { y0, x0, maxAxY } = this;

    //draw y axis
    const svg = document.querySelector(".graph");
    const yAxis = document.createElementNS("http://www.w3.org/2000/svg", "line");
    yAxis.setAttribute("x1", x0);
    yAxis.setAttribute("x2", x0);
    yAxis.setAttribute("y1", maxAxY);
    yAxis.setAttribute("y2", y0);
    yAxis.setAttribute("class", "grid");
    svg.appendChild(yAxis);
    const maxar = Math.max(...dataY);
    const minar = Math.min(...dataY);
    const lenAr = maxar - minar;

    //draw labels for y axis
    let part = 5;
    if (lenAr < part) {
      part = 1;
    }
    const stepY = lenAr / part;
    let pixelValues = [];
    
    //calculate coords of x labels
    for (let i = 0; i <= part; i++) {
      pixelValues[i] = Math.round(maxar - stepY * i);
    }
    if (lenAr == 0) {
      pixelValues = [maxar, maxar - maxar * 1.5];
    }
    let w = 0;
    const step = (y0 - maxAxY) / part;
    let step0 = maxAxY;
    pixelValues.forEach(element => {
      const labelsY = document.createElementNS("http://www.w3.org/2000/svg", "text");
      const textNode = document.createTextNode(element);
      labelsY.setAttribute("x", x0 - 10);
      labelsY.setAttribute("y", step0);
      labelsY.setAttribute("class", "labels y-labels");
      labelsY.appendChild(textNode);
      svg.appendChild(labelsY);
      step0 += step;
      w = w + 1;
    });
  }

  //method conversion data to pixels for x
  dataToPixelsX(dataX) {
    const { x0, maxAxX } = this;

    let i = 0;
    const arrX = [];
    const lx = maxAxX - x0;
    let labX = x0;
    let stepX = lx / (dataX.length - 1);
    dataX.forEach(element => {
      arrX[i] = labX;
      labX += stepX;
      i += 1;
    });
    return arrX;
  }

  //draw x axis
  drawXAxis(dataX, arrX) {
    const { x0, y0, maxAxX } = this;
    const svg = document.querySelector(".graph");
    const xAxis = document.createElementNS("http://www.w3.org/2000/svg", "line");
    xAxis.setAttribute("x1", x0);
    xAxis.setAttribute("x2", maxAxX);
    xAxis.setAttribute("y1", y0);
    xAxis.setAttribute("y2", y0);
    xAxis.setAttribute("class", "grid");
    svg.appendChild(xAxis);

    //draw labels for x axis
    let i = 0;
    dataX.forEach(element => {
      const labelsX = document.createElementNS("http://www.w3.org/2000/svg", "text");
      const textNode = document.createTextNode(dataX[i]);
      labelsX.setAttribute("x", arrX[i]);
      labelsX.setAttribute("y", y0 + 35);
      labelsX.setAttribute("class", "labels x-labels");
      labelsX.appendChild(textNode);
      svg.appendChild(labelsX);
      i += 1;
    });
  }

  //method draw graph line
  drawLine(arrX, arrY, dataY) {
    const svg = document.querySelector(".graph");
    //draw graph line
    const lineGraph = document.createElementNS("http://www.w3.org/2000/svg", "path");
    let line = "";
    let path = "M";
    let i = 0;
    arrY.forEach(element => {
      line = line + " " + arrX[i] + " " + arrY[i];
      i += 1;
    });
    path = path + line;
    lineGraph.setAttribute("d", path);
    lineGraph.setAttribute("stroke", "#ef6c00");
    lineGraph.setAttribute("stroke-width", "1.5");
    lineGraph.setAttribute("fill", "none");
    svg.appendChild(lineGraph);

    //create dots for values
    const tool = document.createElement("div");
    tool.setAttribute("id", "tooltip");
    document.body.appendChild(tool);
    i = 0;
    dataY.forEach(element => {
      const dots = document.createElementNS("http://www.w3.org/2000/svg", "circle");
      dots.setAttribute("cx", arrX[i]);
      dots.setAttribute("cy", arrY[i]);
      dots.setAttribute("r", "7");

      //tooltip
      dots.onmouseover = event => {
        let tooltip = document.getElementById("tooltip");
        tooltip.innerHTML = element;
        tooltip.style.display = "block";
        tooltip.style.left = event.pageX + 10 + "px";
        tooltip.style.top = event.pageY + 10 + "px";
      };
      dots.onmouseout = () => {
        var tooltip = document.getElementById("tooltip");
        tooltip.style.display = "none";
      };
      svg.appendChild(dots);
      i += 1;
    });
  }

  //method delete graph
  deleteGraph() {
    let del = document.querySelector(".graph");
    if (del != null) {
      del.parentNode.removeChild(del);
    }
  }
}
