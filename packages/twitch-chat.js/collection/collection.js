module.exports = class Collection extends Map {

	random() {
		let array = [...this]
		return array[Math.floor(Math.random() * array.length)]
	}
}