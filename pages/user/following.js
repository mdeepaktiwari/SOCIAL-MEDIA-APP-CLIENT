import { Avatar, List } from "antd";
import { useRouter } from "next/router";
import { UserContext } from "../../context";
import { useContext, useEffect, useState } from "react";
import axios from "axios";
import { RollbackOutlined } from "@ant-design/icons";
import Link from "next/link";

const Following = () => {
  const [state, setState] = useContext(UserContext);
  const [people, setPeople] = useState([]);
  const router = useRouter();
  const imageSource = (user) => {
    if (user.image) return user.image.url;
    else return "/images/logo.png";
  };
  useEffect(() => {
    if (state && state.token) {
      fetchFollowing();
    }
  }, [state && state.token]);

  // fetch all following
  const fetchFollowing = async () => {
    try {
      const { data } = await axios.get("/user-following");
      setPeople(data);
    } catch (e) {
      console.log("Error in fetching following", e);
    }
  };

  const handleUnfollow = async (user) => {
    try {
      const { data } = await axios.put("/user-unfollow", {
        _id: user._id,
      });

      let auth = JSON.parse(localStorage.getItem("auth"));
      auth.user = data;
      localStorage.setItem("auth", JSON.stringify(auth));
      // update context
      setState({ ...state, user: data });
      // update people state
      let filtered = people.filter((e) => e._id !== user._id);
      setPeople(filtered);
      // re render the post in news feed
      toast.success(`Unfollowed ${user.name}`);
    } catch (e) {
      console.log(e);
    }
  };

  return (
    <div className=" col-md-6 offset-md-3">
      {/* use antd list component to render the following */}
      <List
        itemLayout="horizontal"
        dataSource={people}
        renderItem={(user) => (
          <List.Item>
            <List.Item.Meta
              avatar={<Avatar src={imageSource(user)} />}
              title={
                <div className="d-flex justify-content-between">
                  <Link
                    className="text-decoration-none"
                    href={`/user/${user.username}`}
                  >
                    {user.name}
                  </Link>
                  <span
                    onClick={() => handleUnfollow(user)}
                    className="text-primary pointer"
                  >
                    {" "}
                    Unfollow
                  </span>
                </div>
              }
            />
          </List.Item>
        )}
      />
      {/* Showing back icon */}
      <Link className="d-flex justify-content-center" href="/user/dashboard">
        <RollbackOutlined />
      </Link>
    </div>
  );
};

export default Following;
