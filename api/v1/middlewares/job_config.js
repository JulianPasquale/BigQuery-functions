module.exports = (req, res, next) => {
  res.locals.paginationConfig = {
    maxResults: parseInt(req.query.maxResults) || 10,
    pageToken:  req.query.pageToken
  }

  next()
}
