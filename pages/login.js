import { useState, useContext } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import { Modal } from "antd";
import Link from "next/link";
import { useRouter } from "next/router";
import AuthForm from "../components/forms/AuthForm";
import { UserContext } from "../context";

const Login = () => {
  // state
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [state, setState] = useContext(UserContext);

  // router
  const router = useRouter();

  async function handleSubmit(e) {
    e.preventDefault();
    try {
      setLoading(true);
      const { data } = await axios.post(`/login`, {
        email,
        password,
      });
      console.log(data);
      if (data.error) {
        toast.error(data.error);
        setLoading(false);
      } else {
        setState({
          user: data.user,
          token: data.token,
        });
        // save in local storage
        window.localStorage.setItem("auth", JSON.stringify(data));
        router.push("/");
      }
    } catch (e) {
      console.log(e);
      console.log(e.response);
      toast.error(e.response.data);
      setLoading(false);
    }
  }
  // it we have token then user is verified we shouldn't let him visit the login page at that time
  if (state && state.token) router.push("/");
  return (
    <div className="container-fluid ">
      <div className="row py-4 bg-secondary text-light bg-default-image ">
        <div className="col text-center ">
          <h2>Login</h2>
        </div>
      </div>
      <div className="row py-3">
        <div className="col-md-6 offset-md-3">
          {/* show input field to the user and pass props */}
          <AuthForm
            handleSubmit={handleSubmit}
            email={email}
            setEmail={setEmail}
            password={password}
            setPassword={setPassword}
            loading={loading}
            page="login"
          />
        </div>
      </div>
      <div className="row">
        <div className="col"></div>
      </div>
      <div className="row">
        <div className="col">
          <p className="text-center">
            New user?{" "}
            <Link className="text-decoration-none" href="/register">
              Register
            </Link>
          </p>
        </div>
      </div>
      <div className="row">
        <div className="col">
          <p className="text-center">
            <Link className="text-decoration-none" href="/forget-password">
              Forget Password?
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};
export default Login;
