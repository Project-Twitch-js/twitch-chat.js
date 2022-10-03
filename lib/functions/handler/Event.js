const Base = require('../bases/BaseHandler.js')
const {correction} = require('../util/f.js')

module.exports = class Event extends Base {
	constructor(twitch, diretory, options) {
		super()
		this.twitch = twitch
		this.diretory = diretory
		this.options = options
	}
	async load() {
		let file = await super.load_folder(this.diretory)
		if(this.options?.subFolder) {
			file = super.load_subfolder(this.diretory)
		}
		if(!file) super.error('The file dont exist')
		this.path_to_file = correction(__dirname, this.diretory)
		file.file.forEach(f => {
			let pull;
			try {
				let EventObj = require(`${this.path_to_file}${file.folder}${f}`)
			f = f.replace('.js', '')
			global.client = this.twitch
			pull = new EventObj()
			} catch(err) {
				super.error('An error occurred in the script ' + err)
			}
			let type = pull.type || 'on'
			f = pull.name?pull.name:f
			this.twitch[type](f, async (...args) => await pull.run(...args))
			return true
		})
	}
}