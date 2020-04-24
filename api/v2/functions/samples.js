const call = require('../../../big_query/crete_query_stream')

const sqlQuery = 'SELECT url FROM `publicdata.samples.github_nested` LIMIT 10'

module.exports = (ws, _req) => {
  dataHandler  = (row) => ws.send(JSON.stringify(row))
  stream       = call(sqlQuery, dataHandler)

  ws.on('closed', (msg) => {
    stream.end()
  })
}
