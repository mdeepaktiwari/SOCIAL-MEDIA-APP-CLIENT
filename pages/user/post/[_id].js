import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import axios from "axios";
import UserRoutes from "../../../components/routes/UserRoute";
import PostForm from "../../../components/forms/PostForm";
import { toast } from "react-toastify";

const EditPost = () => {
  const router = useRouter();
  const [post, setPost] = useState({});
  const [content, setContent] = useState("");
  const [image, setImage] = useState({});
  const [uploading, setUploading] = useState(false);
  const _id = router.query._id;

  useEffect(() => {
    if (_id) fetchPost();
  }, [_id]);
  const fetchPost = async () => {
    try {
      const { data } = await axios.get(`/user-post/${_id}`);
      setPost(data);
      setContent(data.content);
      setImage(data.image);
    } catch (e) {
      console.log(e);
    }
  };

  const postSubmit = async (e) => {
    e.preventDefault();
    console.log("submit post update", content, image);
    try {
      const { data } = await axios.put(`/update-post/${_id}`, {
        content,
        image,
      });
      if (data.error) {
        toast.error(data.error);
      } else {
        toast.success("Post updated successfully");
        router.push("/user/dashboard");
      }
    } catch (e) {
      console.log(e);
    }
  };

  const handleImage = async (e) => {
    console.log(e.target);
    const file = e.target.files[0];
    let formData = new FormData();
    formData.append("image", file);
    console.log([...formData]);
    setUploading(true);
    try {
      const { data } = await axios.post("/upload-image", formData);
      setImage({
        url: data.url,
        public_id: data.public_id,
      });
      // console.log("Form data  ", data);
      setUploading(false);
    } catch (e) {
      console.log(e);
      setUploading(false);
    }
  };

  return (
    <UserRoutes>
      <div className="container-fluid">
        <div className="row py-4 bg-secondary text-light bg-default-image ">
          <div className="col text-center ">
            <h2>News Feed</h2>
          </div>
        </div>
      </div>
      <div children className="row p-3">
        <div className="offset-md-2 col-md-8">
          <PostForm
            content={content}
            postSubmit={postSubmit}
            setContent={setContent}
            handleImage={handleImage}
            uploading={uploading}
            image={image}
          />
        </div>
      </div>
    </UserRoutes>
  );
};

export default EditPost;
