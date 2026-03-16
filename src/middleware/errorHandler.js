import { HttpError } from 'http-errors';

export const errorHandler = (err, req, res, next) => {
  let status = 500;
  let message = err.message || 'Server error';

  if (err instanceof HttpError) {
    status = err.status;
    message = err.message;
  }

  res.status(status).json({
    message,
  });
};
