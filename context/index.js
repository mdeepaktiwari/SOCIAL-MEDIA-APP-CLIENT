import { useState, createContext } from "react";
import { useEffect } from "react";
import axios from "axios";
import { useRouter } from "next/router";

const UserContext = createContext();
const UserProvider = ({ children }) => {
  const router = useRouter;
  const [state, setState] = useState({
    user: {},
    token: "",
  });
  // configuring the axios to automatically add the base URL and also authorisation and token to headers so that
  // we need not to add then everytime with each request
  const token = state && state.token ? state.token : "";
  axios.defaults.baseURL = process.env.NEXT_PUBLIC_API;
  axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;

  // this is being done so that when the token is expired so we can force logout the user
  axios.interceptors.response.use(
    function (response) {
      // do something before request is sent
      return response;
    },
    function (error) {
      // do something with request error
      let res = error.response;
      if (res.status === 401 && res.config && !res.config.__isRetryRequest) {
        setState(null);
        window.localStorage.removeItem("auth");
        router.push("/login");
      }
    }
  );
  // componentDidMount
  useEffect(() => {
    setState(JSON.parse(window.localStorage.getItem("auth")));
  }, []);

  return (
    <UserContext.Provider value={[state, setState]}>
      {children}
    </UserContext.Provider>
  );
};

export { UserProvider, UserContext };
