/**
 * Called when request path does not match with defined routes.
 * Sets http status, notification and messages for response.
 */
module.exports = (_req, res, next) => {
  res.status('404')
  res.locals.notification = 'Esta ruta no ha sido encontrada'

  next(new Error('404 not found'))
}
