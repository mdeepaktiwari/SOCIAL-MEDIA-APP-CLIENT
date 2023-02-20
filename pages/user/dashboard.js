import { useContext, useState, useEffect } from "react";
import { UserContext } from "../../context";
import UserRoutes from "../../components/routes/UserRoute";
import PostForm from "../../components/forms/PostForm";
import { useRouter } from "next/router";
import axios from "axios";
import { toast } from "react-toastify";
import PostList from "../../components/cards/PostList";
import People from "../../components/cards/People";
import Link from "next/link";
import { Modal, Pagination } from "antd";
import CommentForm from "../../components/forms/CommentForm";
import Search from "../../components/Search";
import { io } from "socket.io-client";
// socket
const socket = io(
  process.env.NEXT_PUBLIC_SOCKETIO,
  { path: "/socket.io" },
  {
    reconnection: true,
  }
);

const dashboard = () => {
  // state
  const [state, setState] = useContext(UserContext);
  const [content, setContent] = useState("");
  const [image, setImage] = useState({});
  const [uploading, setUploading] = useState(false);
  const [post, setPost] = useState([]);
  const [people, setPeople] = useState([]);
  const [comment, setComment] = useState("");
  const [visible, setVisible] = useState(false);
  const [currentPost, setCurrentPost] = useState({});
  // route
  const router = useRouter();

  // pagination
  const [totalPost, setTotalPost] = useState(0);
  const [page, setPage] = useState(1);

  // fetch all user feed user + following people
  const newsFeed = async () => {
    try {
      const { data } = await axios.get(`/news-feed/${page}`);
      setPost(data);
    } catch (e) {
      console.log(e);
    }
  };

  // get total post for pagination- componentDidMount
  useEffect(() => {
    try {
      axios.get("/total-post").then(({ data }) => setTotalPost(data));
    } catch (e) {
      console.log(e);
    }
  }, []);

  // get all user whenever token changes
  useEffect(() => {
    if (state && state.token) {
      newsFeed();
      findPeople();
    }
  }, [state && state.token, page]);

  const findPeople = async () => {
    try {
      const { data } = await axios.get("/find-people");
      setPeople(data);
    } catch (e) {
      console.log(e);
    }
  };
  // handler for creating post
  const postSubmit = async (e) => {
    e.preventDefault();
    try {
      const { data } = await axios.post("/create-post", {
        content,
        image,
      });

      if (data.error) {
        toast.error(data.error);
        router.push("/user/dashboard");
      } else {
        setPage(1);
        toast.success("Post created");
        setContent("");
        setImage("");
        newsFeed();
        socket.emit("new-post", data);
      }
    } catch (e) {
      console.log(e);
    }
  };

  // on change upload image as form data
  const handleImage = async (e) => {
    // in case of multiple file take only first one
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

  // delete handler
  const handleDelete = async (post) => {
    try {
      // confirm that click was not accidental
      const answer = window.confirm("Are you sure?");
      if (!answer) {
        return;
      }
      const { data } = await axios.delete(`/delete-post/${post._id}`);
      toast.error("Post deleted");
      newsFeed();
    } catch (e) {
      console.log(e);
    }
  };

  const handleFollow = async (user) => {
    try {
      const { data } = await axios.put("/user-follow", { _id: user._id });

      // update local storage update user keep token
      let auth = JSON.parse(localStorage.getItem("auth"));
      auth.user = data;
      localStorage.setItem("auth", JSON.stringify(auth));
      // update context
      setState({ ...state, user: data });
      // update people state
      let filtered = people.filter((e) => e._id !== user._id);
      setPeople(filtered);
      // re render the post in news feed
      newsFeed();
      toast.success(`Following ${user.name}`);
    } catch (e) {
      console.log(e);
    }
  };
  const handleLike = async (_id) => {
    try {
      const { data } = await axios.put("/like-post", {
        _id,
      });
      newsFeed();
    } catch (e) {
      console.log(e);
    }
  };

  const handleUnlike = async (_id) => {
    try {
      const { data } = await axios.put("/unlike-post", {
        _id,
      });
      newsFeed();
    } catch (e) {
      console.log(e);
    }
  };

  const handleComment = async (post) => {
    setCurrentPost(post);
    setVisible(true);
  };

  const addComment = async (e) => {
    e.preventDefault();
    try {
      const { data } = await axios.put("/add-comment", {
        postId: currentPost._id,
        comment,
      });
      console.log("add-cmment", data);
      setComment("");
      setVisible(false);
      newsFeed();
    } catch (e) {
      console.log(e);
    }
  };

  const removeComment = async (postId, comment) => {
    let answer = window.confirm("Are you sure");
    if (!answer) return;
    try {
      const { data } = await axios.put("/remove-comment", {
        postId,
        comment,
      });
      console.log("comment remove", data);
      newsFeed();
    } catch (e) {
      console.log(e);
    }
  };
  console.log(totalPost, page);

  // dashboard should be secure page hence make sure is token is there
  return (
    <UserRoutes>
      <div className="container-fluid">
        <div className="row py-4 bg-secondary text-light bg-default-image ">
          <div className="col text-center ">
            <h2>Your Mocha</h2>
          </div>
        </div>
      </div>
      <div className="dashboard row p-3">
        <div className="col-md-8">
          {/* form for getting post content */}
          <PostForm
            content={content}
            postSubmit={postSubmit}
            setContent={setContent}
            handleImage={handleImage}
            uploading={uploading}
            image={image}
          />
          <br />
          {/* showing post */}
          <PostList
            handleLike={handleLike}
            handleUnlike={handleUnlike}
            post={post}
            handleDelete={handleDelete}
            handleComment={handleComment}
            addComment={addComment}
            removeComment={removeComment}
          />

          {/* pagination */}
          <Pagination
            current={parseInt(page)}
            total={parseInt((totalPost / 3) * 10)}
            onChange={(val, f) => {
              console.log(val);
              setPage(val);
            }}
            className="pb-3"
          />
        </div>
        {/* Sidebar showing search and follow */}
        <div className="col-md-4 px-3">
          <Search />
          <br />
          {state && state.user && state.user.following && (
            <Link href="/user/following" className="text-decoration-none">
              {state.user.following.length} Following
            </Link>
          )}
          <People handleFollow={handleFollow} people={people} />
        </div>
        {/* show antd modal component for comment */}
        <Modal
          title="Comment"
          open={visible}
          footer={null}
          onCancel={() => {
            setVisible(false);
          }}
        >
          <CommentForm
            comment={comment}
            setComment={setComment}
            addComment={addComment}
          />
        </Modal>
      </div>
    </UserRoutes>
  );
};
export default dashboard;
