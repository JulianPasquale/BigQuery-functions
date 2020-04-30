/**
 * Function to create a query job. This job will be resolved by BigQuery and return our query rows.
 */
const call = require('../../../big_query/create_query')

const sqlQuery =
  "SELECT \
    questions.owner_user_id AS Asker_id, \
    questions.owner_display_name AS Asker_name, \
    COUNT(DISTINCT(questions.id)) as Questions \
  FROM \
    `bigquery-public-data.stackoverflow.posts_answers` AS answers \
  JOIN \
    `bigquery-public-data.stackoverflow.posts_questions` AS questions \
  ON \
    questions.accepted_answer_id = answers.id \
  WHERE \
    questions.owner_user_id = answers.owner_user_id \
  GROUP BY \
    Asker_id, Asker_name \
  ORDER BY \
    Questions DESC"

/**
 * Calls create_query function with sqlQuery.
 * Then sets data and metadata to be formated and returned.
 */
module.exports = (_req, res, next) => {
  call(sqlQuery, res.locals.paginationConfig, next)
    .then(response => {
      res.locals.data     = response.data
      res.locals.metadata = response.metadata

      next()
    })
    .catch(err => {
      res.locals.notification = 'Error al conectarse con BigQuery'
      next(err)
    })
}
