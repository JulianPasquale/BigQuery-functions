var express        = require('express')
const { BigQuery } = require('@google-cloud/bigquery')
var router         = express.Router()

require('dotenv').config()

/* GET users listing. */
router.get('/', function(req, res, next) {
  query().then((result) => res.send(result))
})

async function query() {
  // Queries the U.S. given names dataset for the state of Texas.

  const bigquery = new BigQuery()

  const query = `SELECT name
    FROM \`bigquery-public-data.usa_names.usa_1910_2013\`
    WHERE state = 'TX'
    LIMIT 100`

  // For all options, see https://cloud.google.com/bigquery/docs/reference/rest/v2/jobs/query
  const options = {
    query: query,
    // Location must match that of the dataset(s) referenced in the query.
    location: 'US',
  }

  // Run the query as a job
  const [job] = await bigquery.createQueryJob(options)
  console.log(`Job ${job.id} started.`)

  // Wait for the query to finish
  const [rows] = await job.getQueryResults()

  // Print the results
  console.log('Rows:')
  rows.forEach(row => console.log(row))

  return rows
}
// [END bigquery_query]

module.exports = router
