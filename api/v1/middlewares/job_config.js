module.exports = (req, res, next) => {
  res.locals.paginationConfig = {
    maxResults: req.params.maxResults,
    pageToken:  req.params.pageToken
  }

  next()
}
