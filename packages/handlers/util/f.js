const path = require('path')

exports.correction = (dirname, path_, dir_) => {
	const dirPath = path.join(dirname);
	const c = process.cwd()

	let dir = dirPath.replace(c, '')
	let s = ""
	for(let i = 0; i < dirPath.length; i++) {
		if(dir[i] === '/') {
			s = "../" + s
		}
	}
	
	path_ = path_.replace('./', '')
	path_ = s + path_
	return path_
}