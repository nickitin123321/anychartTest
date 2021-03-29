export default class DataController extends EventTarget {
  constructor(url) {
    super();
    this.url = url;
    this.data = [];
    this.checkData();

    //DataController fetch data every 1000ms
    setInterval(() => this.checkData(), 1000);
  }

  //method fetch data
  async fetchData() {
    // const body = {
    //   url: this.url,
    // };

    const response = await fetch(this.url , {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      //body: JSON.stringify(body),
    });

    let { data } = await response.json();
    data = data.filter(({ x, value }) => value !== undefined && x !== undefined);

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
