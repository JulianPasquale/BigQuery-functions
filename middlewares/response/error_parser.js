module.exports =  (err, req, res, _next) => {
  console.error(err.stack)

  res.status(500).send(
    {
      notification: res.locals.notification || 'Something broke!',
      message:      err.message,
      metadata:     req.body
    }
  )
}
