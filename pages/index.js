import { useContext, useEffect, useState } from "react";
import { UserContext } from "../context";
import Parallexbg from "../components/cards/Parallaxbg";
import axios from "axios";
import Link from "next/link";
import PostPublic from "../components/cards/PostPublic";
import Head from "next/head";
import { LinkOutlined } from "@ant-design/icons";
import { io } from "socket.io-client";

// socket
const socket = io(
  process.env.NEXT_PUBLIC_SOCKETIO,
  { path: "/socket.io" },
  {
    reconnection: true,
  }
);

// here we wil first receive the data from the server then only component will be rendered
const Home = ({ posts }) => {
  // context
  const [state, setState] = useContext(UserContext);
  const [newsFeed, setNewsFeed] = useState([]);
  // display socket io received message using an alert
  // useEffect(() => {
  //   console.log("Socketio on join", socket);
  //   socket.on("receive-message", (msg) => {
  //     alert(msg);
  //   });
  // }, []);

  useEffect(() => {
    socket.on("new-post", (newPost) => {
      setNewsFeed([newPost, ...posts]);
    });
  }, []);

  const collection = newsFeed.length > 0 ? newsFeed : posts;
  const head = () => (
    <Head>
      <title>CafeBook-a social media website</title>
      <meta name="description" content="a social media website" />
      <meta property="og:description" content="a social media website" />
      <meta property="og:sit_name" content="cafebook" />
      <meta property="og:url" content="http://cafebook.com" />
      <meta
        property="og:image:secure_url"
        content="http://merncamp.com/images/coffee.jpg"
      />
    </Head>
  );

  return (
    <>
      {head()}
      <Parallexbg url="images/coffee.jpg" children="Take your Cappuccino" />
      <div className="container">
        {/* <button
          onClick={() => {
            socket.emit("send-message", "This is me");
          }}
        >
          Send
        </button> */}
        <div className="row py-5">
          {collection.map((post) => (
            <div key={post._id} className=" col-md-10 offset-md-1 text-end">
              <Link
                className="text-muted text-decoration-none "
                href={`/post/view/${post._id}`}
              >
                <LinkOutlined />
              </Link>
              <PostPublic key={post._id} e={post} />
            </div>
          ))}
        </div>
      </div>
    </>
  );
};

// this method is from next we use this to increase the SEO of our application
// unless we receive data and populate the field the component will not render
export async function getServerSideProps() {
  const { data } = await axios.get("/posts");
  return {
    props: {
      posts: data,
    },
  };
}

export default Home;

// naming convention is mandatory in next.js like public folder is mandatory and should have a file named
// index.js
// names of file are added to the url
