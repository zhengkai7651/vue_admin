const path = require("path");
module.exports = {
	appPort: 8899,
	viewDir: path.resolve("./view"),
	staticDir: path.resolve("./public"),
	dbConfig: {
		connectionLimit : 10,
		host: '47.97.107.221',
		user: 'git_dev',
		password: 'zGDFXK8GfCZrYD62',
		database: 'git_dev'
	}
}