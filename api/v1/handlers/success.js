/**
 * Success response format for http requests.
 * This middleware process and return data from previous middleares.
 * It will always return a 200 http status with a standard JSON format body.
 * Previous functions should write res.locals.data and res.locals.metadata (the last one is optional) to be able to return this information.
 */
module.exports = (req, res, _next) => (
  res.status(200).send(
    {
      data:     res.locals.data,
      metadata: {
        ...res.locals.metadata,
        query:   req.query,
        payload: req.body
      }
    }
  )
)
