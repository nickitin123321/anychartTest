export default class ChartController {
  constructor(dataController) {
    if (dataController != null) {
      dataController.addEventListener("dataChanged", event => {
        const data = event.detail;
        this.deleteGraph();
        this.draw(data);
      });
    } else {
      this.deleteGraph();
    }
  }
  //method draw graph
  draw(data) {
    const dataY = [];
    const dataX = [];

    //sort to y value array
    data.forEach(element => {
      dataY.push(element.value);
    });
    // //sort to x value array
    data.forEach(element => {
      dataX.push(element.x);
    });

    //function search max of array
    function getMaxOfArray(numArray) {
      return Math.max(...numArray);
    }

    //function search min of array
    function getMinOfArray(numArray) {
      return Math.min(...numArray);
    }
    //length of data arrays
    const lenX = dataX.length;

    //max and min of values array
    const maxar = getMaxOfArray(dataY);
    const minar = getMinOfArray(dataY);

    const lenAr = maxar - minar;
    //coords of 0 in pixels
    const x0 = 90;
    const y0 = 440;

    //max coords of x and y axises
    const maxAxY = 120;
    const maxAxX = 690;

    const lenY = y0 - maxAxY;

    //create svg element
    const svg = document.createElementNS("http://www.w3.org/2000/svg", "svg");
    svg.setAttribute("class", "graph");
    document.body.appendChild(svg);

    //draw y axis
    const yAxis = document.createElementNS("http://www.w3.org/2000/svg", "line");
    yAxis.setAttribute("x1", x0);
    yAxis.setAttribute("x2", x0);
    yAxis.setAttribute("y1", maxAxY);
    yAxis.setAttribute("y2", y0);
    yAxis.setAttribute("class", "grid");
    svg.appendChild(yAxis);

    //draw x axis
    const xAxis = document.createElementNS("http://www.w3.org/2000/svg", "line");
    xAxis.setAttribute("x1", x0);
    xAxis.setAttribute("x2", maxAxX);
    xAxis.setAttribute("y1", y0);
    xAxis.setAttribute("y2", y0);
    xAxis.setAttribute("class", "grid");
    svg.appendChild(xAxis);

    //data to pixels for y

    let k = 0;
    if (lenAr != 0) {
      k = lenY / lenAr;
    } else {
      k = lenY / maxar;
    }
    const arrY = [];
    let i = 0;
    dataY.forEach(element => {
      arrY.push(y0 + k * (minar - element));
      i += 1;
    });

    //data to pixels for x
    i = 0;
    const arrX = [];
    const lx = maxAxX - x0;
    let labX = x0;
    let stepX = lx / (lenX - 1);
    dataX.forEach(element => {
      arrX[i] = labX;
      labX += stepX;
      i += 1;
    });

    //draw labels for x axis
    i = 0;
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

    //draw labels for y axis*
    let part = 5;
    if (lenAr < part) {
      part = 1;
    }
    const stepy = lenAr / part;
    let pixelValues = [];
    for (i = 0; i <= part; i++) {
      pixelValues[i] = Math.round(maxar - stepy * i);
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

    //draw graph line
    const lineGraph = document.createElementNS("http://www.w3.org/2000/svg", "path");
    let he = "";
    let l0 = "M";
    i = 0;
    dataY.forEach(element => {
      he = he + " " + arrX[i] + " " + arrY[i];
      i += 1;
    });
    l0 = l0 + he;
    lineGraph.setAttribute("d", l0);
    lineGraph.setAttribute("stroke", "#ef6c00");
    lineGraph.setAttribute("stroke-width", "1.5");
    lineGraph.setAttribute("fill", "none");
    svg.appendChild(lineGraph);
    console.log(lineGraph);

    //create dots for values and titles for dots
    i = 0;
    dataY.forEach(element => {
      const dots = document.createElementNS("http://www.w3.org/2000/svg", "circle");
      const titleDots = document.createElementNS("http://www.w3.org/2000/svg", "title");
      const textNode = document.createTextNode(element);
      dots.setAttribute("cx", arrX[i]);
      dots.setAttribute("cy", arrY[i]);
      dots.setAttribute("r", "7");
      titleDots.appendChild(textNode);
      dots.appendChild(titleDots);
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
