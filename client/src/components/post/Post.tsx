import "./post.scss";
import moment from "moment";
import Comments from "../comments/Comments";
import MoreHorizIcon from "@mui/icons-material/MoreHoriz";
import ShareOutlinedIcon from "@mui/icons-material/ShareOutlined";
import TextsmsOutlinedIcon from "@mui/icons-material/TextsmsOutlined";
import FavoriteOutlinedIcon from "@mui/icons-material/FavoriteOutlined";
import FavoriteBorderOutlinedIcon from "@mui/icons-material/FavoriteBorderOutlined";
import { Link } from "react-router-dom";
import { Collapse } from "@mui/material";
import { useEffect, useState } from "react";
import { postState } from "../../store/postsSlice";
import { makeRequest } from "../../utils/makeRequest";
import { setComments } from "../../store/commentsSlice";
import { addLike, setLikes } from "../../store/likesSlice";
import { useAppDispatch, useAppSelector } from "../../store/hooks";

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
          <MoreHorizIcon />
        </div>
        <div className="content">
          <p>{post.desc}</p>
          <img
            src={post.img?.includes("/") ? post.img : `/uploads/${post.img}`}
            alt=""
          />
        </div>
        <div className="info">
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
        <Collapse in={showComments}>
          <Comments postId={post.id} comments={postComments?.comments} />
        </Collapse>
      </div>
    </div>
  );
}

export default Post;
