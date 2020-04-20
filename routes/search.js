var express        = require('express')
const { BigQuery } = require('@google-cloud/bigquery')
var router         = express.Router()

require('dotenv').config()

const bigquery = new BigQuery()

router.get('/', function(req, res, next) {
  call().then((result) => res.send(result))
})

call = async () => (
  bigquery.createQueryJob('SELECT repo_name FROM `bigquery-public-data.github_repos.sample_repos` LIMIT 10').then((data) => {
    const job         = data[0]
    const apiResponse = data[1]

    console.log(`Job ${job.id} started.`)
    
    return job.getQueryResults().then((data) => {
      console.log(data)
      return data[0];
    });
  })
)

module.exports = router
