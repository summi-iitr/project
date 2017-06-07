let processQueryHandler = require('./process_query_handler')
let processFeatureHandler = require('./process_feature_handler')
let answerHandler = require('./answer_handler')


let handlers = {
  click:[{
    selector:'#predict_answer',
    callback: answerHandler
  },
  {
    selector:'#demo_process_question',
    callback: processQueryHandler
  },
  {
  	selector:'#demo_process_features',
  	callback: processFeatureHandler
  }
  ]
}
module.exports = handlers
