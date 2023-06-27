export const notFound = (req, res, next) => {
  const error = new Error(`Not Found - ${req.originalUrl}`);
  res.status(404);
  next(error);
};

const errorHandler = (err, req, res, next) => {
  const status = res.statusCode ? res.statusCode : 500; // server error

  res.status(status);

  res.json({ message: err.message, isError: true });
};

export default errorHandler;
