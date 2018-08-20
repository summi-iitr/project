const PythonBridge = require('./python_bridge');

module.exports = (text, callback) => {
  let pythonBridge = new PythonBridge('processors/query_processor.py')
  pythonBridge.runFunc(text, callback)
}
