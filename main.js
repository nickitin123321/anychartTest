import DataController from "./DataController.js";
import ChartController from "./ChartController.js";
const input = document.querySelector(".url");
const button = document.querySelector(".upgrade");

const dataController = new DataController();
new ChartController(dataController);

//event click on button
button.onclick = () => {
  dataController.setDataSource(input.value);
};
