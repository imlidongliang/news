
const modulesFiles = require.context('./modules', true, /.js$/)
const modules = {}
modulesFiles.keys().forEach( (key) => {
	Object.assign(modules, modulesFiles(key))
})

export default modules