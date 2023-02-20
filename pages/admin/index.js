import { useContext, useState, useEffect } from "react";
import { UserContext } from "../../context";
import UserRoutes from "../../components/routes/UserRoute";
import { useRouter } from "next/router";
import axios from "axios";
import { toast } from "react-toastify";
import AdminRoute from "../../components/routes/AdminRoute";
import renderHTML from "react-render-html";

const Admin = () => {
  // state
  const [state, setState] = useContext(UserContext);
  const [post, setPost] = useState([]);
  // route
  const router = useRouter();

  const newsFeed = async () => {
    try {
      const { data } = await axios.get(`/posts`);
      setPost(data);
    } catch (e) {
      console.log(e);
    }
  };

  // get all user whenever token changes
  useEffect(() => {
    if (state && state.token) {
      newsFeed();
    }
  }, [state && state.token]);

  // delete handler
  const handleDelete = async (post) => {
    try {
      // confirm that click was not accidental
      const answer = window.confirm("Are you sure?");
      if (!answer) {
        return;
      }
      const { data } = await axios.delete(`/admin/delete-post/${post._id}`);
      toast.error("Post deleted");
      newsFeed();
    } catch (e) {
      console.log(e);
    }
  };

  return (
    <AdminRoute>
      <div className="container-fluid">
        <div className="row py-4 bg-secondary text-light bg-default-image ">
          <div className="col text-center ">
            <h2>Admin</h2>
          </div>
        </div>
        <div className="col-md-8 offset-md-2 py-5">
          {post.map((e) => (
            <div
              className="py-3 text-muted d-flex d-flex justify-content-between"
              key={e._id}
            >
              <div>
                <b>{e.postedBy.name} </b>
                {renderHTML(e.content)}
              </div>
              <div
                className="text-danger pointer"
                onClick={() => handleDelete(e)}
              >
                Delete
              </div>
            </div>
          ))}
        </div>
      </div>
    </AdminRoute>
  );
};
export default Admin;
