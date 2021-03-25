import  DataController from './DataController.js';
import  ChartController from './ChartController.js';
const input = document.querySelector('.url');
const button  = document.querySelector('.upgrade');
const button1 = document.querySelector('.delete')

//event click on button  
button.onclick = async function(){
    const dataController = new DataController(input.value);
    const chartController =  new ChartController(dataController);
}
button1.onclick =  function(){
    const chartController = new ChartController();
    chartController.deleteGraph();
}
