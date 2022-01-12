import { useAuth } from "./useAuth";

export const useApi = () => {
  const { token, authenticate } = useAuth();

  const fetchWithAuth = async (apiCall, ...options) => {
    try {
      return await apiCall(token, ...options);
    } catch (e) {
      if (e.name === "HttpError" && e.status === 401) {
        authenticate(false);
      }
      throw e;
    }
  };

  return fetchWithAuth;
};
