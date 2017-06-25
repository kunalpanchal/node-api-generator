let data = require('./../data');

module.exports = `{
  "name": "`+ data.projectName + `",
  "version": "`+ data.version + `",
  "description": "`+ data.description + `",
  "main": "`+ data.entry_point + `",
  "scripts": {
    "test": "exit 1",
    "thecrawler": "node-dev server"
  },
  "repository": {
    "type": "git",
    "url": "`+ data.git + `"
  },
  "dependencies": {
    "body-parser": "^1.17.2",
    "cheerio": "^1.0.0-rc.1",
    "cors": "^2.8.3",
    "dotenv": "^4.0.0",
    "express": "^4.15.3",
    "node-dev": "^3.1.3",
    "request": "^2.81.0",
    "request-promise": "^4.2.1"
  },
  "author": "`+ data.author + `",
  "license": "`+ data.license + `"
}
`