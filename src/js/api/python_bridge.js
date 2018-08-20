const python_base = "./src/python/"
let spawn = require('child_process').spawn
class PythonBridge{
  constructor(fileName){
    let filePath = python_base + fileName
    this.pyhonProcess = spawn('python', [filePath])
    console.log(filePath)
    if(this.pythonProcess){
      console.log("I spawned")
    }
    else{
      console.log("I failed")
    }
    this.init()
  }
  init(){
    this.pythonProcess.stdout.on('data', (data) => {
      dataString += data.toString();
    })
    this.pythonProcess.stderr.on('data', (data) => {
      let errorString = data.toString();
      console.error(errorString)
    })
    this.pythonProcess.stdout.on('end',() =>{
      if(this.callback){
        this.callback(dataString)
      }
    })
  }

  run(fileName, param, callback){
    let dataString = ""
    this.callback = callback
    this.pythonProcess.stdin.write(JSON.stringify(param))
    this.pythonProcess.stdin.end()
  }

  runFunc(fileName, param, callback){
    let dataString = ""
    this.callback = callback
    this.pythonProcess.stdin.write(JSON.stringify(param))
    this.pythonProcess.stdin.end()
  }
}
module.exports = PythonBridge
