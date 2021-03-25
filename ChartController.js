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

//const for calculating
	draw(data){
		function getMaxOfArray (numArray) {
			return Math.max.apply(null, numArray);
		}
		function getMinOfArray (numArray) {
			return Math.min.apply(null, numArray);
		}

		const datan = data.slice(0,-1);
		const datav = [];
		const datax = [];
		datan.forEach(element => {
			datav.push(element.value);
			})
		datan.forEach(element => {
			datax.push(element.x);
			})
		const lenv = datav.length;
		const lenx = datax.length;
		let maxar = getMaxOfArray(datav);
		let minar = getMinOfArray(datav);
		const x0 = 90;
		const y0 = 350;
		const maxAxY = 120;
		const maxAxX = 690;
		const shiftAxY = y0+90;
		// const xmax = x0+50*(lenv-1);
		const ymax = y0-maxar;

		//data to pixels

	//  for (i = 0; i<lenv; i++){
	// 	arrx[i] = x0 + i*50;
	// 	arry[i] = y0-datav[i];
	//  }
		//draw y axis
		const svg  = document.createElementNS('http://www.w3.org/2000/svg','svg');
		svg.setAttribute('class','graph')
		document.body.appendChild(svg);
		//draw y axis 
		const liney = document.createElementNS('http://www.w3.org/2000/svg','line');
		liney.setAttribute('x1', x0);
		liney.setAttribute('x2', x0);
		liney.setAttribute('y1', maxAxY);
		liney.setAttribute('y2', shiftAxY);
		liney.setAttribute('class', 'grid');
		svg.appendChild(liney);
		
		//draw x axis
		const linex = document.createElementNS('http://www.w3.org/2000/svg','line');
		linex.setAttribute('x1', x0);
		linex.setAttribute('x2', maxAxX);
		linex.setAttribute('y1', shiftAxY);
		linex.setAttribute('y2', shiftAxY);
		linex.setAttribute('class', 'grid');
		svg.appendChild(linex);
	
		const arry = [];
		const arrx = [];
		let i = 0;
		//const kSmaller = shiftAxY- maxAxY)/Math.abs(shiftAxY-shiftAxY);
		datav.forEach(element => {
			arry[i] = (y0 - element);
			i+=1;
		});

		i = 0;
		const lx = maxAxX - x0;
		let labx = x0; 
		let stepx = lx/(lenx-1);
		datax.forEach(element => {
			arrx[i] = labx;
			labx += stepx;
			i+=1;
		});

		i = 0;
		//const xlable = document.querySelector('.x-labels');
		datax.forEach(element=>{
			const labe = document.createElementNS('http://www.w3.org/2000/svg','text');
			const textNode = document.createTextNode(datax[i]);
			labe.setAttribute('x', arrx[i] );
			labe.setAttribute('y', y0+125);
			labe.setAttribute('id','3')
			labe.setAttribute('class','labels x-labels')
			labe.appendChild(textNode);
			svg.appendChild(labe);
			i+=1
		})

		//draw y labels
		const part = 5;
		const ly = maxar-minar;
		const stepy = ly/part;
		let pixel = [];
		for (i = 0 ;i<=part;i++){
			pixel[i]=Math.round(maxar-stepy*i);
		}
		let w= 0;
		const step = (shiftAxY - maxAxY)/part;
		let laby = maxAxY;
		pixel.forEach(element=>{
			const labey = document.createElementNS('http://www.w3.org/2000/svg','text');
			const textNode = document.createTextNode(element);
			labey.setAttribute('x', x0-10 );
			labey.setAttribute('y', laby);
			labey.setAttribute('class','labels y-labels')
			labey.appendChild(textNode);
			svg.appendChild(labey);
			laby +=step;
			w =  w + 1;
		})

		//draw graph
		const line1 = document.createElementNS('http://www.w3.org/2000/svg','path');
		let he = '';
		let l0 = 'M';
		i=0;
		datav.forEach(element => {
				he = he + ' ' +arrx[i]+ ' ' +arry[i];
			i+=1;
		});
		l0 = l0 + he;
		line1.setAttribute('d', l0);
		line1.setAttribute('stroke','#ef6c00');
		line1.setAttribute('stroke-width','1.5');
		line1.setAttribute('fill', 'none');
		svg.appendChild(line1);
		
		//creat tooltip
		i=0;
		datav.forEach(element => {
		const dots = document.createElementNS('http://www.w3.org/2000/svg','circle');
		const titleDots = document.createElementNS('http://www.w3.org/2000/svg','title');
		const textNode = document.createTextNode(element);
		dots.setAttribute('cx', arrx[i]);
		dots.setAttribute('cy', arry[i]);
		dots.setAttribute('r', '5');
		titleDots.appendChild(textNode);
		dots.appendChild(titleDots);
		svg.appendChild(dots);
		i+=1;
		});
	}

deleteGraph(){
	
		let del = document.querySelector('.graph');
		if(del!=null){
		del.parentNode.removeChild(del);
		}
}
}
