const DEFAULT_API_URL = "http://localhost:5000";
const API_URL = process.env.REACT_APP_API_URL || DEFAULT_API_URL;

class HttpError extends Error {
  name = "HttpError";

  constructor(message, status = 400) {
    super(message);
    this.status = status;
  }
}

/**
 * Fetch function for API calls
 *
 * - Adds API base url to routes
 * - Adds authToken as header if provided
 * - Adds JSON content type automatically
 * - Converts JS object to JSON if `body` is provided
 * - Automatically throws error if API responds with non ok response
 */
const fetchWithAuth = async (path, { body, authToken, ...options } = {}) => {
  const response = await fetch(`${API_URL}${path}`, {
    ...options,
    headers: {
      ...(options.headers || {}),
      "content-type": "application/json",
      ...(authToken ? { authorization: `Bearer ${authToken}` } : {}),
    },
    ...(body ? { body: JSON.stringify(body) } : {}),
  });

  const jsonData = await response.json();
  if (!jsonData.ok) {
    throw new HttpError(jsonData.error, response.status);
  }

  return jsonData;
};

export const createProfile = async (authToken, body) => {
  const { data } = await fetchWithAuth("/profile", {
    method: "POST",
    authToken,
    body,
  });

  return data;
};

export const getProfile = async (authToken) => {
  const { data } = await fetchWithAuth("/profile", {
    authToken,
  });

  return data;
};

export const updateProfile = async (authToken, body) => {
  const { data } = await fetchWithAuth("/profile", {
    method: "PUT",
    authToken,
    body,
  });

  return data;
};

export const getUsers = async (authToken) => {
  const { data } = await fetchWithAuth("/profiles", {
    authToken,
  });

  return data;
};

export const getTransactions = async (authToken) => {
  const { data } = await fetchWithAuth("/transactions", {
    authToken,
  });

  return data;
};

export const makeTransfer = async (authToken, body) => {
  const { data } = await fetchWithAuth("/transfer", {
    method: "POST",
    authToken,
    body,
  });

  return data;
};

export const makeWithdrawal = async (authToken, body) => {
  const { data } = await fetchWithAuth("/transactions", {
    method: "POST",
    authToken,
    body: {
      ...body,
      amount: -body.amount,
    },
  });

  return data;
};

export const makeDeposit = async (authToken, body) => {
  const { data } = await fetchWithAuth("/transactions", {
    method: "POST",
    authToken,
    body,
  });

  return data;
};
