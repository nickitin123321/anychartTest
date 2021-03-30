import DataController from "./DataController.js";
import ChartController from "./ChartController.js";
const input = document.querySelector(".url");
const button = document.querySelector(".upgrade");

const dataController = new DataController();
new ChartController(dataController);

//set datasource on click
button.onclick = () => {
  dataController.setDataSource(input.value);
};
