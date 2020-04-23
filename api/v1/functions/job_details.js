const getJob = require('../../../big_query/get_job')

module.exports = (req, res, next) => (
  getJob(req.params.id)
    .then((data) => {
      const { metadata, ...dataResult } = data[0]

      res.locals.data     = dataResult
      res.locals.metadata = metadata
      next()
    })
    .catch(next)
)
