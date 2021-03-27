import DataController from "./DataController.js";
import ChartController from "./ChartController.js";
const input = document.querySelector(".url");
const button = document.querySelector(".upgrade");

//event click on button
button.onclick = () => {
  const dataController = new DataController(input.value);
  new ChartController(dataController);
};
