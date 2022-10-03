module.exports = class Err {
	constructor(data) {
		if(!data.response) return console.log(data)
		this.data = data.response.data
		this.err()
	}

	err() {
		if(this.data.error) {
			throw new Error(`TwitchAPIError[${this.data.status}]: ${this.data.error}: ${this.data.message}`)
		}
		
	}
}