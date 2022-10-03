const fs = require('node:fs/promises')

const makeError = require('../error/error.js');
const path = require('path');

module.exports = class Base {
	async load_folder(diretory) {
		let r = await fs.readdir(diretory)
		return {
			folder: '',
			file: r
		}
	}
	async load_subfolder(diretory) {
		let folder = await fs.readdir(diretory)
		folder.forEach(async(f) => {
			let file = await fs.readdir(diretory+f)
			return {
				file: file,
				folder: f
			}
		});
	}

	error(...args) {
		makeError(...args)
	}
}