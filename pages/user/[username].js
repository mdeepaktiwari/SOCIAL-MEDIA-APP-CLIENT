import { Card } from "antd";
import moment from "moment";
import { useRouter } from "next/router";
import { UserContext } from "../../context";
import { useContext, useEffect, useState } from "react";
import axios from "axios";
import { RollbackOutlined } from "@ant-design/icons";
import Link from "next/link";
const { Meta } = Card;

// Individual user component showing details
const Username = () => {
  // state
  const [state, setState] = useContext(UserContext);
  // indiviual user
  const [user, setUser] = useState({});
  // router
  const router = useRouter();
  const imageSource = (user) => {
    if (user.image) return user.image.url;
    else return "/images/logo.png";
  };
  useEffect(() => {
    if (router.query.username) fetchUser();
  }, [router.query.username]);

  const fetchUser = async () => {
    try {
      const { data } = await axios.get(`/user/${router.query.username}`);
      setUser(data);
    } catch (e) {
      console.log(e);
    }
  };

  return (
    <div className="row col-md-6 offset-md-3">
      <div className="py-3">
        <Card
          hoverable
          cover={
            <img
              className="p-3"
              style={{ height: "150px", width: "150px" }}
              src={imageSource(user)}
            />
          }
        >
          <Meta title={user.name} description={user.about} />
          <p className="pt-2 text-muted">
            Joined {moment(user.createdAt).fromNow()}
          </p>
          {/* show followers and following length */}
          <div className="d-flex justify-content-between text-muted">
            <span>Followers {user.followers && user.followers.length}</span>
            <span>Following {user.following && user.following.length}</span>
          </div>
        </Card>
      </div>
      {/* show go back icon */}
      <Link className="d-flex justify-content-center" href="/user/dashboard">
        <RollbackOutlined />
      </Link>
    </div>
  );
};

export default Username;
