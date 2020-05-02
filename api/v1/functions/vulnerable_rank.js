/**
 * Function to create a query job. This job will be resolved by BigQuery and return our query rows.
 */
const call = require('../../../big_query/create_query')

/**
 * https://www.sjoerdlangkemper.nl/2017/06/07/finding-vulnerable-code-in-github-with-bigquery/
 */
const sqlQuery = 
  "SELECT \
    repos.repo_name \
  FROM \
    \`bigquery-public-data.github_repos.sample_repos\` repos \
  LEFT JOIN \
    \`bigquery-public-data.github_repos.languages\` languages \
  ON \
    repos.repo_name = languages.repo_name \
  CROSS JOIN UNNEST(languages.language) as lang \
  LEFT JOIN \
    \`bigquery-public-data.github_repos.sample_files\` files \
  ON \
    repos.repo_name = files.repo_name \
  LEFT JOIN \
    \`bigquery-public-data.github_repos.sample_contents\` contents \
  ON \
    files.id = contents.id \
  WHERE \
    (lower(lang.name) = lower(@language)) \
      AND \
    (NOT contents.binary) \
      AND \
    (REGEXP_CONTAINS(contents.content, r'(@contains)')) \
  GROUP BY \
  repos.repo_name, repos.watch_count \
  ORDER BY \
  repos.watch_count DESC \
  LIMIT \
  10"

/**
 * Calls create_query function with sqlQuery.
 * Then sets data and metadata to be formated and returned.
 */
module.exports = (req, res, next) => {
  /**
   * Language must be a language name and contains a REGEXP for matching files content.
   */
  const language = req.query.language
  const contains = req.query.contains

  if (!language || !contains) {
    res.status('400')
    res.locals.notification = 'Los parámetros "language" y "contains" son obligatorios. Asugúrate de proveer ambos'

    return next(new Error('400 Bad Request'))
  }

  const sqlConfig = {
    query:           sqlQuery,
    parameterMode:   'NAMED',
    useLegacySql:    false,
    queryParameters: [
      {
        name:     'language',
        parameterType: {
          type: 'STRING'
        },
        parameterValue: {
          value: language,
        }
      },
      {
        name:     'contains',
        parameterType: {
          type: 'STRING'
        },
        parameterValue: {
          value: contains,
        }
      }
    ]
  }

  call(sqlConfig, res.locals.paginationConfig, next)
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
