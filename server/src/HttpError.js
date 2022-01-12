module.exports = class HttpError extends Error {
  name = "HttpError";

  constructor(message, status = 400) {
    super(message);
    this.status = status;
  }
};
