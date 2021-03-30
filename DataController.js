export default class DataController extends EventTarget {
  constructor() {
    super();
    this.data = [];
  }

  setDataSource(url) {
    if (this.timerId) clearInterval(this.timerId);
    this.url = url;
    this.checkData();
    //DataController check data every 1000ms
    this.timerId = setInterval(() => this.checkData(), 1000);
    console.log(this.timerId);
  }

  //method fetch data
  async fetchData() {
    const response = await fetch(this.url);

    let { data } = await response.json();
    data = data.filter(({ x, value }) => typeof value === "number" && typeof x === "string");

    return data;
  }

  //method tracking update of data
  isDataUpdated(data) {
    if (JSON.stringify(data) !== JSON.stringify(this.data)) {
      this.data = data;
      return true;
    }
    return false;
  }

  //method check change of data
  async checkData() {
    const data = await this.fetchData();
    if (this.isDataUpdated(data)) {
      //dataChanged event do then data changed
      const newEvent = new CustomEvent("dataChanged", {
        detail: data,
      });
      this.dispatchEvent(newEvent);
    }
  }
}
