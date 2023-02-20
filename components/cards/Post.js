import renderHTML from "react-render-html";
import moment from "moment";
import { Avatar } from "antd";
import PostImage from "../images/PostImage";
import { UserContext } from "../../context/index";
import { useContext, useState } from "react";
import { useRouter } from "next/router";
import Link from "next/link";
import { imageSource } from "../../functions";
import {
  CommentOutlined,
  HeartOutlined,
  HeartFilled,
  EditOutlined,
  DeleteOutlined,
} from "@ant-design/icons";

const Post = ({
  e,
  handleDelete,
  handleComment,
  handleLike,
  commentCount = 2,
  addComment,
  removeComment,
  handleUnlike,
}) => {
  const [state] = useContext(UserContext);
  const router = useRouter();
  const [like, setLike] = useState();
  // give every post e its basic functionality like, unlike, commment, delete and edit
  console.log(e);
  return (
    <>
      {e && e.postedBy && (
        <div key={e._id} className="card px-0 mb-5">
          <div className="card-header">
            <div className="d-flex justify-content-between">
              <div>
                {/* if image present show image otherwise show default image */}
                <Avatar src={imageSource(e.postedBy)} />
                <span>
                  {"   "}
                  {e.postedBy.name}
                </span>
              </div>
              <span className="pt-2 ml-3 text-muted fs-6">
                {moment(e.createdAt).fromNow()}
              </span>
            </div>
          </div>
          <div className="card-body">{renderHTML(e.content)}</div>
          <div className="card-footer">
            <div>
              {e.image && <PostImage url={e.image.url} />}
              <div className="d-flex justify-content-between">
                <div className="d-flex align-items-center py-2">
                  <div className="d-flex align-items-center ">
                    {/* conditionally change like and unlike icon */}
                    {state &&
                    state.user &&
                    e &&
                    e.likes &&
                    e.likes.includes(state.user._id) ? (
                      <HeartFilled
                        onClick={() => handleUnlike(e._id)}
                        className="text-danger"
                      />
                    ) : (
                      <HeartOutlined
                        onClick={() => handleLike(e._id)}
                        className="text-danger"
                      />
                    )}
                    <div className="px-1">
                      {e && e.likes && e.likes.length} Likes
                    </div>
                  </div>
                  <div className="d-flex align-items-center mx-3">
                    <CommentOutlined
                      onClick={() => handleComment(e)}
                      className="text-primary ml-3"
                    />
                    <div className="px-1">
                      <Link
                        className="text-decoration-none text-dark"
                        href={`/post/${e._id}`}
                      >
                        {e && e.comments && e.comments.length} Comment
                      </Link>
                    </div>
                  </div>
                </div>

                {state && state.user && state.user._id == e.postedBy._id && (
                  <div className="d-flex align-items-center py-2">
                    <EditOutlined
                      onClick={() => router.push(`/user/post/${e._id}`)}
                      className="text-success mx-3"
                    />
                    <DeleteOutlined
                      onClick={() => handleDelete(e)}
                      className="text-primary mx-3"
                    />
                  </div>
                )}
              </div>
            </div>
          </div>
          {e && e.comments && e.comments.length > 0 && (
            <ol
              className="list-group"
              // style={{ maxHeight: "125px", overflowY: "scroll" }}
            >
              {e.comments.slice(0, commentCount).map((c) => {
                return (
                  <li
                    key={c._id}
                    className="list-group-item d-flex justify-content-between align-items-start"
                  >
                    <div className="ms-2 me-auto">
                      <div>
                        <Avatar
                          size={20}
                          className="mb-1 mr-3"
                          src={imageSource(c.postedBy)}
                        />
                        {" " + c.postedBy.name}
                      </div>
                      <div>{c.text}</div>
                    </div>
                    <span className="badge rounded-pill text-muted">
                      {moment(c.created).fromNow()}
                      {state &&
                        state.user &&
                        state.user._id == c.postedBy._id && (
                          <div className="mt-auto mt-1">
                            <DeleteOutlined
                              onClick={() => {
                                removeComment(e._id, c);
                              }}
                              className="pl-3 text-danger"
                            />
                          </div>
                        )}
                    </span>
                  </li>
                );
              })}
            </ol>
          )}
        </div>
      )}
    </>
  );
};
export default Post;
