import { useState, useContext } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import { Modal } from "antd";
import Link from "next/link";
import { useRouter } from "next/router";
import { UserContext } from "../context";
import ForgetPasswordForm from "../components/forms/ForgetPasswordForm";

const Forgetpassword = () => {
  // state
  const [email, setEmail] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [secret, setSecret] = useState("");
  const [state, setState] = useContext(UserContext);
  // tracking the response
  const [ok, setOk] = useState(false);
  // show loader while we fetch the data
  const [loading, setLoading] = useState(false);
  //router
  const router = useRouter();

  async function handleSubmit(e) {
    e.preventDefault();
    try {
      setLoading(true);
      const { data } = await axios.post(`/forget-password`, {
        email,
        newPassword,
        secret,
      });
      console.log(data);

      if (data.error) {
        toast.error(data.error);
        setLoading(false);
      }
      if (data.success) {
        console.log(data);
        setEmail("");
        setNewPassword("");
        setSecret("");
        setLoading(false);
        setOk(true);
      }
    } catch (e) {
      toast.error(e);
      setLoading(false);
    }
  }
  // if user have a valid token then we will not let him navigate forget password page
  if (state && state.token) router.push("/");
  return (
    <div className="container-fluid ">
      <div className="row py-4 bg-secondary text-light bg-default-image ">
        <div className="col text-center ">
          <h2>Reset Password</h2>
        </div>
      </div>
      <div className="row py-3">
        <div className="col-md-6 offset-md-3">
          {/* show input fields and pass props */}
          <ForgetPasswordForm
            handleSubmit={handleSubmit}
            email={email}
            setEmail={setEmail}
            newPassword={newPassword}
            setNewPassword={setNewPassword}
            secret={secret}
            setSecret={setSecret}
            loading={loading}
          />
        </div>
      </div>
      <div className="row">
        <div className="col">
          {/* show success response */}
          <Modal
            title="Congratulations!"
            open={ok}
            onCancel={() => setOk(false)}
            footer={null}
          >
            <p>Password reset successfully</p>
            {/* let user to navigate and login */}
            <Link className="btn btn-success" href="/login">
              Login
            </Link>
          </Modal>
        </div>
      </div>
    </div>
  );
};
export default Forgetpassword;
