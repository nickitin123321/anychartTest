export default class ChartController{
	constructor(dataController) {
		if(dataController != null){
			dataController.addEventListener('dataChanged', event => {
				const { data } = event.detail;
				this.draw(data);
		});
		}
		else{
			this.deleteGraph();
		}
}
	//method draw graph
	draw(data){
		//function search max of array
		function getMaxOfArray (numArray) {
			return Math.max.apply(null, numArray);
		}
		//function search min of array
		function getMinOfArray (numArray) {
			return Math.min.apply(null, numArray);
		}

		//remove no value 
		const datan = data.slice(0,-1);
		const datav = [];
		const datax = [];

		//sort to y value array
		datan.forEach(element => {
			datav.push(element.value);
			})
		//sort to x value array
		datan.forEach(element => {
			datax.push(element.x);
			})
		
		//length of data arrays
		const lenv = datav.length;
		const lenx = datax.length;

		//max and min of values array
		const maxar = getMaxOfArray(datav);
		const minar = getMinOfArray(datav);
		
		//coords of 0 in pixels
		const x0 = 90;
		const y0 = 350;
		
		//max coords of x and y axises
		const maxAxY = 120;
		const maxAxX = 690;
		
		//shift y coord of 0
		const shiftAxY = y0+90;

		//create svg element
		const svg  = document.createElementNS('http://www.w3.org/2000/svg','svg');
		svg.setAttribute('class','graph')
		document.body.appendChild(svg);

		//draw y axis 
		const yAxis = document.createElementNS('http://www.w3.org/2000/svg','line');
		yAxis.setAttribute('x1', x0);
		yAxis.setAttribute('x2', x0);
		yAxis.setAttribute('y1', maxAxY);
		yAxis.setAttribute('y2', shiftAxY);
		yAxis.setAttribute('class', 'grid');
		svg.appendChild(yAxis);
		
		//draw x axis
		const xAxis = document.createElementNS('http://www.w3.org/2000/svg','line');
		xAxis.setAttribute('x1', x0);
		xAxis.setAttribute('x2', maxAxX);
		xAxis.setAttribute('y1', shiftAxY);
		xAxis.setAttribute('y2', shiftAxY);
		xAxis.setAttribute('class', 'grid');
		svg.appendChild(xAxis);
	
		//data to pixels for y *
		const arrY = [];
		let i = 0;
		datav.forEach(element => {
			arrY[i] = (y0 - element);
			i+=1;
		});
		
		//data to pixels for x
		i = 0;
		const arrX = [];
		const lx = maxAxX - x0;
		let labX = x0; 
		let stepX = lx/(lenx-1);
		datax.forEach(element => {
			arrX[i] = labX;
			labX += stepX;
			i+=1;
		});

		//draw labels for x axis
		i = 0;
		datax.forEach(element=>{
			const labelsX = document.createElementNS('http://www.w3.org/2000/svg','text');
			const textNode = document.createTextNode(datax[i]);
			labelsX.setAttribute('x', arrX[i] );
			labelsX.setAttribute('y', y0+125);
			labelsX.setAttribute('class','labels x-labels');
			labelsX.appendChild(textNode);
			svg.appendChild(labelsX);
			i+=1
		})

		//draw labels for y axis*
		const part = 5;
		const ly = maxar-minar;
		const stepy = ly/part;
		let pixelValues = [];
		for (i = 0 ;i<=part;i++){
			pixelValues[i]=Math.round(maxar-stepy*i);
		}
		let w = 0;
		const step = (shiftAxY - maxAxY)/part;
		let step0 = maxAxY;
		pixelValues.forEach(element=>{
			const labelsY = document.createElementNS('http://www.w3.org/2000/svg','text');
			const textNode = document.createTextNode(element);
			labelsY.setAttribute('x', x0-10 );
			labelsY.setAttribute('y', step0);
			labelsY.setAttribute('class','labels y-labels')
			labelsY.appendChild(textNode);
			svg.appendChild(labelsY);
			step0 +=step;
			w =  w + 1;
		})

		//draw graph line
		const lineGraph = document.createElementNS('http://www.w3.org/2000/svg','path');
		let he = '';
		let l0 = 'M';
		i=0;
		datav.forEach(element => {
				he = he + ' ' +arrX[i]+ ' ' +arrY[i];
			i+=1;
		});
		l0 = l0 + he;
		lineGraph.setAttribute('d', l0);
		lineGraph.setAttribute('stroke','#ef6c00');
		lineGraph.setAttribute('stroke-width','1.5');
		lineGraph.setAttribute('fill', 'none');
		svg.appendChild(lineGraph);
		
		//create dots for values and titles for dots
		i=0;
		datav.forEach(element => {
		const dots = document.createElementNS('http://www.w3.org/2000/svg','circle');
		const titleDots = document.createElementNS('http://www.w3.org/2000/svg','title');
		const textNode = document.createTextNode(element);
		dots.setAttribute('cx', arrX[i]);
		dots.setAttribute('cy', arrY[i]);
		dots.setAttribute('r', '5');
		titleDots.appendChild(textNode);
		dots.appendChild(titleDots);
		svg.appendChild(dots);
		i+=1;
		});
	}

	//method delete graph
	deleteGraph(){
		let del = document.querySelector('.graph');
		if(del!=null){
			del.parentNode.removeChild(del);
		}
}
}
