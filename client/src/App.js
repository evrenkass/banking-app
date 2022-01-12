import React, { useEffect, useState } from "react";

import { AuthContext } from "./core/auth";
import { getProfile } from "./core/api";

import { CredentialsLoading } from "./CredentialsLoading";
import { PublicPortal } from "./public/PublicPortal";
import { ProtectedPortal } from "./protected/ProtectedPortal";

export const App = () => {
  const [token, setToken] = useState(null);
  const [profileData, setProfileData] = useState(null);
  const [loading, setLoading] = useState(true);

  const authenticate = (user) => {
    if (user) {
      setToken(user.accessToken);
      window.sessionStorage.setItem("accessToken", user.accessToken);
    } else {
      setToken(null);
      setProfileData(null);
      window.sessionStorage.removeItem("accessToken");
    }
  };

  useEffect(() => {
    const accessToken = window.sessionStorage.getItem("accessToken");
    if (accessToken) {
      setToken(accessToken);
    } else {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    const dataFetcher = async () => {
      setLoading(true);
      try {
        const data = await getProfile(token);
        setProfileData(data);
      } catch (e) {
        setToken(null);
      } finally {
        setLoading(false);
      }
    };

    if (token) {
      dataFetcher();
    }
  }, [token]);

  if (loading) return <CredentialsLoading />;

  return (
    <AuthContext.Provider
      value={{ token, profileData, setProfileData, authenticate }}
    >
      {token && profileData ? <ProtectedPortal /> : <PublicPortal />}
    </AuthContext.Provider>
  );
};
