/**
 * Middleware for set up shared jobs configuration. Prepares pagination object.
 */
module.exports = (req, res, next) => {
  /**
   * Writes paginationConfig key in res.locals.
   * Jobs can assume this key is set and with the property format.
   * It expects maxResults and pageToken as request url params.
   */
  resº.locals.paginationConfig = {
    maxResults: parseInt(req.query.maxResults) || 10,
    pageToken:  req.query.pageToken
  }

  next()
}
