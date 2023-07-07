const notFound = (err, req, res, next) => {
  //const error = new Error(`Not Found - ${req.originalUrl}`)
  const error = err
  res.status(404)
  next(error)
}

const errorHandler = (err, req, res, next) => {
  const statusCode = res.statusCode === 200 ? 500 : res.statusCode
  res.status(statusCode)
  res.json({
    message: err.message,
    stack: process.env.NODE_ENV === 'production' ? null : err.stack
  })
  //2 respon in one router akan menyebabkan cannot sent header
  
}

export { notFound, errorHandler }