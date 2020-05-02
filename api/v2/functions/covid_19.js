/**
 * Requires function for query streams creation.
 */
const call = require('../../../big_query/crete_query_stream')

/**
 * Build sql query to send to BigQuery as String.
 */
const sqlQuery =
  'SELECT \
    FORMAT_DATE("%x", date) as date, \
    deaths, confirmed, recovered, \
    latitude as lat, longitude as lng, \
    combined_key as location \
  FROM \
    `bigquery-public-data.covid19_jhu_csse.summary` \
  WHERE \
    latitude IS NOT NULL AND \
    longitude IS NOT NULL \
  LIMIT \
    50'

    // CURRENT_DATE([time_zone])

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
