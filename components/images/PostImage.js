const PostImage = ({ url }) => {
  return (
    <div
      style={{
        backgroundRepeat: "no-repeat",
        backgroundPosition: "center center",
        backgroundImage: "url(" + url + ")",
        backgroundSize: "cover",
        height: "300px",
      }}
    ></div>
  );
};

export default PostImage;
