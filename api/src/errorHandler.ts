import { ErrorRequestHandler } from "express"

export const errorHandler: ErrorRequestHandler = (err, req, res, _next) => {
  res.locals.message = err.message
  res.locals.error = req.app.get("env") === "development" ? err : {}

  res.status(err.status || 500)
  res.render("error")
}
