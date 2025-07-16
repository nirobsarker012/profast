import React, { use } from "react";
import { AuthContext } from "../contexts/AuthContext/AuthContext";

const useAuth = () => {
  const autnInfo = use(AuthContext);
  return autnInfo;
};

export default useAuth;
