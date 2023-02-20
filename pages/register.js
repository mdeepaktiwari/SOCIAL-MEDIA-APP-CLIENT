import { useState, useContext } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import { Modal } from "antd";
import Link from "next/link";
import { useRouter } from "next/router";
import { UserContext } from "../context";

import AuthForm from "../components/forms/AuthForm";

const Register = () => {
  // state variable
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [secret, setSecret] = useState("");
  const [loading, setLoading] = useState(false);
  const [state, setState] = useContext(UserContext);
  // ok response will be received from the backend
  const [ok, setOk] = useState(false);
  // router
  const router = useRouter();

  async function handleSubmit(e) {
    e.preventDefault();
    try {
      setLoading(true);
      const { data } = await axios.post(`/register`, {
        name,
        email,
        password,
        secret,
      });
      if (data.error) {
        toast.error(data.error);
        setLoading(false);
      } else {
        setName("");
        setEmail("");
        setPassword("");
        setSecret("");
        setLoading(false);
        setOk(data.ok);
      }
    } catch (e) {
      setLoading(false);
    }
  }
  // it we have token then user is verified we shouldn't let him visit the register page at that time
  if (state && state.token) router.push("/");
  return (
    <div className="container-fluid ">
      <div className="row py-4 bg-secondary text-light bg-default-image ">
        <div className="col text-center ">
          <h2>Register</h2>
        </div>
      </div>
      <div className="row py-3">
        <div className="col-md-6 offset-md-3">
          {/* show input field using authform and pass props for handling state */}
          <AuthForm
            handleSubmit={handleSubmit}
            name={name}
            setName={setName}
            email={email}
            setEmail={setEmail}
            password={password}
            setPassword={setPassword}
            secret={secret}
            setSecret={setSecret}
            loading={loading}
          />
        </div>
      </div>
      <div className="row">
        <div className="col">
          {/* if we get okay response we will show success response */}
          <Modal
            title="Congratulations!"
            open={ok}
            onCancel={() => setOk(false)}
            footer={null}
          >
            <p>You have successfully registered</p>

            {/* once user registered then we want to let him navigate to login page*/}
            <Link className="btn btn-success" href="/login">
              Login
            </Link>
          </Modal>
        </div>
      </div>
      <div className="row">
        <div className="col">
          <p className="text-center">
            Already registered?{" "}
            <Link className="text-decoration-none" href="/login">
              Login
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};
export default Register;
