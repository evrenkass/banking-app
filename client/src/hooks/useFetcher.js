import { useEffect, useState } from "react";

import { useApi } from "./useApi";

export const useFetcher = (api) => {
  const fetchApi = useApi();
  const [dataState, setDataState] = useState({
    error: false,
    loading: false,
    data: undefined,
  });

  const fetchData = async () => {
    try {
      setDataState((prev) => ({
        error: false,
        loading: true,
        data: prev.data,
      }));
      const data = await fetchApi(api);
      setDataState({ error: false, loading: false, data });
    } catch (e) {
      setDataState((prev) => ({
        error: e.message,
        loading: false,
        data: prev.data,
      }));
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  return [dataState, fetchData];
};
