export type ServerError = {
  status: 500;
  error: string | 'An error occurred on the server';
};

export type BadRequestError = {
  status: 400;
  error: string | 'Bad request';
};

export type UnauthorizedError = {
  status: 401;
  error: string | 'Unauthorized';
};

export type NotFoundError = {
  status: 404;
  error: string | 'The page you are looking for does not exist';
};

export type Error = ServerError | BadRequestError | UnauthorizedError | NotFoundError;
