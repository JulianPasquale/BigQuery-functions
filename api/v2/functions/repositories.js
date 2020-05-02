/**
 * Requires function for query streams creation.
 */
const call = require('../../../big_query/crete_query_stream')

/**
 * Build sql query to send to BigQuery as String.
 */
const sqlQuery = 'SELECT repo_name, watch_count FROM `bigquery-public-data.github_repos.sample_repos` LIMIT 50'

module.exports = (ws, _req) => {
  /**
   * This function is a callback. It will be called on each row returned by BigQuery.
   */
  dataHandler = (row) => ws.send(JSON.stringify(row))

  /** 
   * Gets a ResourceStream object, with dataHandler already binded for data receivement.
   */
  stream = call(sqlQuery, dataHandler)

  /**
   * Handles web socket connection close.
   * Function will be executed after successdully closed connection.
   * Uses stream instance to stop BigQuery requests.
   */
  ws.on('closed', () => stream.end())
}
