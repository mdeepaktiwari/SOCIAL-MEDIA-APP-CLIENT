import Parallexbg from "../../../components/cards/Parallaxbg";
import axios from "axios";
import PostPublic from "../../../components/cards/PostPublic";
import Head from "next/head";

const SinglePost = ({ post }) => {
  const head = () => (
    <Head>
      <title>CafeBook-a social media website</title>
      <meta name="description" content={post.content} />
      <meta property="og:description" content="a social media website" />
      <meta property="og:sit_name" content="cafebook" />
      <meta
        property="og:url"
        content={`http://cafebook.com/post/view/${post._id}`}
      />
      <meta property="og:image:secure_url" content={imageSource(post)} />
    </Head>
  );

  const imageSource = (post) => {
    if (post.image) return post.image.url;
    else return "/images/coffee.jpg";
  };

  return (
    <>
      {head()}
      <Parallexbg
        url="../../images/coffee.jpg"
        children="Take your Cappuccino"
      />
      <div className="container">
        <div className="row py-5">
          <div className=" col-md-10 offset-1 text-end">
            <PostPublic key={post._id} e={post} />
          </div>
        </div>
      </div>
    </>
  );
};

export async function getServerSideProps(ctx) {
  const { data } = await axios.get(`/post/${ctx.params._id}`);
  return {
    props: {
      post: data,
    },
  };
}

export default SinglePost;
