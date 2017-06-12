
const PythonBridge = require('./python_bridge');

module.exports = (callback) => {
  let pythonBridge = new PythonBridge()
  pythonBridge.run('processors/scraping.py', "", callback)
}
