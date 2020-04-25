/**
 * Default error handler.
 * Formats exeptions and return standard JSON format.
 */
module.exports = (err, req, res, _next) => {
  /**
   * Default http status code to 500.
   * Previous middleares status has precedence.
   */
  let statusCode = 500

  if (res.statusCode && res.statusCode !== 200) {
    statusCode = res.statusCode
    console.error(err.stack)
  }

  res.status(statusCode)
  res.json(
    {
      /**
       * Middlewares can set notifications in with a custom error message to return.
       */
      notification: res.locals.notification || 'Error inesperado!',
      /**
       * Message read from exception.
       */
      message:      err.message,
      metadata:     {
        ...res.locals.metadata,
        query:   req.query,
        payload: req.body
      }
    }
  )
}
