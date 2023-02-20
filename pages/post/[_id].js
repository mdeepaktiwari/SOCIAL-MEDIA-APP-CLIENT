import { RollbackOutlined } from "@ant-design/icons";
import axios from "axios";
import { useRouter } from "next/router";
import { useState, useEffect } from "react";
import Post from "../../components/cards/Post";
import Link from "next/link";
const PostComments = ({ people, handleFollow }) => {
  const [post, setPost] = useState({});
  const router = useRouter();
  const _id = router.query._id;

  useEffect(() => {
    if (_id) {
      fetchPost();
    }
  }, [_id]);

  const fetchPost = async () => {
    try {
      const { data } = await axios.get(`/user-post/${_id}`);
      setPost(data);
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
      fetchPost();
    } catch (e) {
      console.log(e);
    }
  };
  return (
    <>
      <div className="container-fluid ">
        <div className="row  bg-secondary text-light bg-default-image ">
          <div className="col text-center ">
            <h2>Give Instant Coffee</h2>
          </div>
        </div>
        <div className="row col-md-8 offset-2 py-5">
          <Post e={post} removeComment={removeComment} commentCount={100} />
        </div>
        <Link
          className="d-flex justify-content-center p-3"
          href="/user/dashboard"
        >
          {<RollbackOutlined />}
        </Link>
      </div>
    </>
  );
};

export default PostComments;
