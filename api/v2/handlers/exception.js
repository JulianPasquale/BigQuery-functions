module.exports = (err, req, res, _next) => {
  let statusCode = 500

  if (res.statusCode && res.statusCode !== 200) {
    statusCode = res.statusCode
    console.error(err.stack)
  }

  res.status(statusCode)
  res.json(
    {
      notification: res.locals.notification || 'Error inesperado!',
      message:      err.message,
      metadata:     {
        ...res.locals.metadata,
        query:   req.query,
        payload: req.body
      }
    }
  )
}
