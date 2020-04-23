module.exports = (req, res, next) => {
  res.status('404')
  res.locals.notification = 'Esta ruta no ha sido encontrada'
  next(new Error('404 not found'))
}
