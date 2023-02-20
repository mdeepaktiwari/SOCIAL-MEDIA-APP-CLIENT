import { Avatar } from "antd";
import { CameraOutlined, LoadingOutlined } from "@ant-design/icons";
import dynamic from "next/dynamic";
// rich text editor
const ReactQuill = dynamic(() => import("react-quill"), { ssr: false });
import "react-quill/dist/quill.snow.css";

const PostForm = ({
  image,
  uploading,
  content,
  postSubmit,
  setContent,
  handleImage,
}) => {
  return (
    <div className="card">
      <div className="card-body">
        <form className="form-group">
          <ReactQuill
            theme="snow"
            onChange={(e) => {
              setContent(e);
            }}
            className="form-control"
            placeholder="Say something..."
            value={content}
          />
        </form>
      </div>

      <div className="d-flex text-muted justify-content-between card-footer text-end">
        <label>
          {/* if image is presnt show image otherwise if it uploading
        show uploading icon otherwise show camera */}
          {image && image.url ? (
            <Avatar size={30} src={image.url} className="mt-1" />
          ) : uploading ? (
            <LoadingOutlined className="mt-2" />
          ) : (
            <CameraOutlined className="mt-2" />
          )}
          <input onChange={handleImage} hidden type="file" accept="images/*" />
        </label>
        {/* if content is not there then disable buttom */}
        <button
          disabled={!content}
          onClick={postSubmit}
          className="btn btn-secondary btn-sm mt-1"
        >
          Post
        </button>
      </div>
    </div>
  );
};

export default PostForm;
