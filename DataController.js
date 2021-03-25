export default class DataController extends EventTarget {
	constructor(url){
		super();
		this.url = url;
		this.data = [];
		setInterval(async instance => {			
			const data = await instance.fetchData();
			if (instance.isDataUpdated(data)) {
			const newEvent = new CustomEvent('dataChanged', {
				detail: { data }
			});
			instance.dispatchEvent(newEvent);
			}
		}, 1000, this);
		}
	async  fetchData(){
		const body = {
			url: this.url
		};

		const response = await fetch('http://localhost:5000/', {
		method: 'POST',
		headers: { 'Content-Type': 'application/json' },
		body: JSON.stringify(body)
		});
		
		const {data} = await response.json();
		return data;
	}
  
	isDataUpdated(data) {
		if (JSON.stringify(data) !== JSON.stringify(this.data)) {
			this.data = data;
			return true;
	}
			
			return false;
		
	}
}