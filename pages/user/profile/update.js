import { useState, useContext, useEffect } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import { Modal, Avatar } from "antd";
import Link from "next/link";
import { CameraOutlined, LoadingOutlined } from "@ant-design/icons";
import { useRouter } from "next/router";
import { UserContext } from "../../../context";
import AuthForm from "../../../components/forms/AuthForm";

const ProfileUpdate = () => {
  const [username, setUsername] = useState("");
  const [about, setAbout] = useState("");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [secret, setSecret] = useState("");
  const [ok, setOk] = useState(false);
  const [loading, setLoading] = useState(false);
  // profile image
  const [image, setImage] = useState([]);
  const [uploading, setUploading] = useState(false);
  const [state, setState] = useContext(UserContext);
  // router
  const router = useRouter();
  useEffect(() => {
    if (state && state.user) {
      setUsername(state.user.username);
      setName(state.user.name);
      setEmail(state.user.email);
      setAbout(state.user.about);
      setImage(state.user.image);
    }
  }, [state && state.user]);

  async function handleSubmit(e) {
    e.preventDefault();
    try {
      setLoading(true);
      const { data } = await axios.put(`/profile-update`, {
        name,
        username,
        about,
        password,
        image,
        secret,
      });
      if (data.error) {
        toast.error(data.error);
        setLoading(false);
      } else {
        // if data updated on server need to update the data in the localstorage as well
        let auth = JSON.parse(localStorage.getItem("auth"));
        auth.user = data;
        localStorage.setItem("auth", JSON.stringify(auth));
        setState({ ...state, user: data });
        console.log(auth);
        setLoading(false);
        setOk(true);
      }
    } catch (e) {
      setLoading(false);
    }
  }
  const handleImage = async (e) => {
    const file = e.target.files[0];
    let formData = new FormData();
    formData.append("image", file);
    setUploading(true);
    try {
      const { data } = await axios.post("/upload-image", formData);
      setImage({
        url: data.url,
        public_id: data.public_id,
      });
      setUploading(false);
    } catch (e) {
      console.log(e);
      setUploading(false);
    }
  };

  return (
    <div className="container-fluid ">
      <div className="row py-4 bg-secondary text-light bg-default-image ">
        <div className="col text-center ">
          <h2>Profile</h2>
        </div>
      </div>
      <div className="row py-3">
        <div className="col-md-6 offset-md-3">
          <label className="d-flex justify-content-center h5">
            {image && image.url ? (
              <Avatar size={150} src={image.url} className="mt-1" />
            ) : uploading ? (
              <LoadingOutlined className="mt-2" />
            ) : (
              <CameraOutlined className="mt-2" />
            )}
            <input
              onChange={handleImage}
              hidden
              type="file"
              accept="images/*"
            />
          </label>
          <AuthForm
            username={username}
            setUsername={setUsername}
            about={about}
            setAbout={setAbout}
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
            profileUpdate={true}
          />
        </div>
      </div>
      <div className="row">
        <div className="col">
          {/* show success message to the user */}
          <Modal
            title="Congratulations!"
            open={ok}
            onCancel={() => setOk(false)}
            footer={null}
          >
            <p>Profile updated successfully</p>
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
export default ProfileUpdate;
