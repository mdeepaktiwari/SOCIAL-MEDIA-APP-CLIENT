const CommentForm = ({ addComment, setComment, comment }) => {
  return (
    <form onSubmit={addComment}>
      <textarea
        type="text"
        className="form-contol w-100"
        placeholder="Write something..."
        value={comment}
        onChange={(e) => setComment(e.target.value)}
      />

      <button type="submit" className="btn btn-secondary btn-sm btn-block">
        Comment
      </button>
    </form>
  );
};

export default CommentForm;
