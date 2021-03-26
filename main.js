import DataController from "./DataController.js";
import ChartController from "./ChartController.js";
const input = document.querySelector(".url");
const button = document.querySelector(".upgrade");

//event click on button
button.onclick = async function () {
  const chartController1 = new ChartController();
  const dataController = new DataController(input.value);
  const chartController = new ChartController(dataController);
};
