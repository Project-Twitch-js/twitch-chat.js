const Base = require('./Base.js')

module.exports = class Stream extends Base {
	constructor(data, t) {
		super(data)
		this._data(data, t)
	}

	_data(data, t) {
		let arr = [];
		if('is_live' in data) {
			t.isLive = data.is_live
		}
		if('tags_ids' in data) {
			this.tagsIds = data.forEach(ids => arr.push(data.tags_ids))
		}
		if('thumbnail_url' in data) {
			this.thumbnail = data.thumbnail_url
		}
		if('started_at' in data) {
			this.startedAt = data.started_at
		}
		if('title' in data) {
			this.title = data.title
		}
	}
}