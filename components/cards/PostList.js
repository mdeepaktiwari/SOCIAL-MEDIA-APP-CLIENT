import Post from "./Post";

const PostList = ({
  post,
  handleDelete,
  handleComment,
  handleLike,
  removeComment,
  handleUnlike,
}) => {
  return (
    <>
      {post.map((e) => {
        return (
          <Post
            key={e._id}
            e={e}
            handleDelete={handleDelete}
            handleComment={handleComment}
            handleLike={handleLike}
            handleUnlike={handleUnlike}
            removeComment={removeComment}
          />
        );
      })}
    </>
  );
};
export default PostList;
