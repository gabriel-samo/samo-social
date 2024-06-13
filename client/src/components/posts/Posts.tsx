import "./posts.scss";
import axios from "axios";
import Post from "../post/Post";
import notify from "../../utils/Notify";
import { useEffect } from "react";
import { setPosts } from "../../store/postsSlice";
import { useAppDispatch, useAppSelector } from "../../store/hooks";

type PostsProps = {
  userId?: number;
};

function Posts({ userId }: PostsProps) {
  const dispatch = useAppDispatch();
  const posts = useAppSelector((state) => state.posts);
  const currentUser = useAppSelector((state) => state.currentUser);

  useEffect(() => {
    const URL = userId
      ? `http://localhost:3012/api/posts?userId=${userId}`
      : "http://localhost:3012/api/posts";
    axios
      .get(URL, {
        headers: { Authorization: currentUser.token }
      })
      .then((res) => {
        dispatch(setPosts(res.data));
      })
      .catch((err) => {
        notify.error(err.message);
      });
  }, []);

  return (
    <div className="posts">
      {posts.map((post) => (
        <Post post={post} key={post.id} />
      ))}
    </div>
  );
}

export default Posts;
