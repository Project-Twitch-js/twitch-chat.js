const Base = require('../bases/BaseHandler.js');
const {correction} = require('../util/f.js')

module.exports = class HandlerCommand extends Base {
	constructor(twitch, diretory, options) {
		super()
		this.diretory = diretory
		this.options = options
		this.twitch = twitch
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
				let CmdObj = require(`${this.path_to_file}${file.folder}${f}`)
			pull = new CmdObj()
			} catch(err) {
				super.error('An error occurred in the script ' + err)
			}
			this.twitch.commands.set(pull.name, pull)
			pull.aliases?.forEach(aliase => {
				this.twitch.aliases.set(aliase, pull)
			})
			return true
		})
	}
}