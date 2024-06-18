import "./post.scss";
import moment from "moment";
import Comments from "../comments/Comments";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import MoreHorizIcon from "@mui/icons-material/MoreHoriz";
import ShareOutlinedIcon from "@mui/icons-material/ShareOutlined";
import TextsmsOutlinedIcon from "@mui/icons-material/TextsmsOutlined";
import FavoriteOutlinedIcon from "@mui/icons-material/FavoriteOutlined";
import FavoriteBorderOutlinedIcon from "@mui/icons-material/FavoriteBorderOutlined";
import { Dropdown } from "rsuite";
import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import { Collapse, IconButton } from "@mui/material";
import { postState } from "../../store/postsSlice";
import { makeRequest } from "../../utils/makeRequest";
import { setComments } from "../../store/commentsSlice";
import { addLike, setLikes } from "../../store/likesSlice";
import { useAppDispatch, useAppSelector } from "../../store/hooks";
import PostUpdate from "../postUpdate/PostUpdate";

type PostProps = {
  post: postState;
};

function Post({ post }: PostProps) {
  const dispatch = useAppDispatch();
  const [showComments, setShowComments] = useState(false);
  const currentUser = useAppSelector((state) => state.currentUser);
  const postLikes = useAppSelector((state) => state.likes).find(
    (item) => item.postId === post.id
  );
  const postComments = useAppSelector((state) => state.comments).find(
    (item) => item.postId === post.id
  );
  const liked = postLikes?.usersIds?.includes(currentUser.id!);
  const [openPostUpdate, setOpenPostUpdate] = useState(false);

  useEffect(() => {
    makeRequest()
      .get("/comments/?postId=" + post.id)
      .then((res) => {
        dispatch(setComments({ comments: res.data, postId: post.id }));
        return makeRequest().get("/likes/?postId=" + post.id);
      })
      .then((res) => {
        dispatch(setLikes({ usersIds: res.data, postId: post.id }));
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  const handleLike = () => {
    makeRequest(currentUser.token)
      .post("/likes/add", { postId: post.id })
      .then((res) => {
        if (res.data.addedLike) {
          const { postId, userId } = res.data.addedLike;
          dispatch(addLike({ postId, userId }));
        } else {
          return makeRequest().get("/likes/?postId=" + post.id);
        }
      })
      .then((res) => {
        if (res) dispatch(setLikes({ usersIds: res.data, postId: post.id }));
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const handleDelete = () => {};

  const renderToggle = (props: any) => (
    <IconButton {...props} className="toggleButton">
      <MoreHorizIcon className="moreIcon" />
    </IconButton>
  );

  return (
    <div className="post">
      <div className="container">
        <div className="user">
          <div className="userInfo">
            <img src={post.profilePic} alt="" />
            <div className="details">
              <Link to={`/profile/${post.userId}`}>
                <span className="name">{post.name}</span>
              </Link>
              <span className="date">{moment(post.createdAt).fromNow()}</span>
            </div>
          </div>
          {currentUser.id === post.userId && (
            <Dropdown renderToggle={renderToggle} className="menuList">
              <Dropdown.Item
                icon={<EditIcon />}
                className="menuItem editIcon"
                onClick={() => {
                  setOpenPostUpdate(true);
                }}
              >
                <span>Edit</span>
              </Dropdown.Item>
              <Dropdown.Item
                icon={<DeleteIcon />}
                className="menuItem deleteIcon"
                onClick={handleDelete}
              >
                <span>Delete</span>
              </Dropdown.Item>
            </Dropdown>
          )}
        </div>
        <div className="content">
          <p>{post.desc}</p>
          <img
            src={post.img?.includes("//") ? post.img : `${post.img}`}
            alt=""
          />
        </div>
        <div className="info">
          <div className="items">
            <div className="item">
              {liked ? (
                <FavoriteOutlinedIcon
                  onClick={handleLike}
                  style={{ color: "red" }}
                />
              ) : (
                <FavoriteBorderOutlinedIcon onClick={handleLike} />
              )}
              {postLikes?.usersIds?.length || 0} Likes
            </div>
            <div
              className="item"
              onClick={() => {
                setShowComments(!showComments);
              }}
            >
              <TextsmsOutlinedIcon />
              {postComments?.comments?.length || 0} Comments
            </div>
            <div className="item">
              <ShareOutlinedIcon />
              Share
            </div>
          </div>
          <div className="updatedAt">
            <i>
              {post.updatedAt
                ? "Edited " + moment(post.updatedAt).fromNow()
                : ""}
            </i>
          </div>
        </div>
        <Collapse in={showComments}>
          <Comments postId={post.id} comments={postComments?.comments} />
        </Collapse>
      </div>
      {openPostUpdate && (
        <PostUpdate
          post={post}
          openPostUpdate={openPostUpdate}
          setOpenPostUpdate={setOpenPostUpdate}
        />
      )}
    </div>
  );
}

export default Post;
