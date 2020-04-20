module.exports =  (req, res, _next) => {
  res.status(200).send(
    {
      data:     res.locals.data,
      metadata: req.body
    }
  )
}
