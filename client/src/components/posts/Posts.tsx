import "./posts.scss";
import Post from "../post/Post";
import notify from "../../utils/Notify";
import { useEffect } from "react";
import { setPosts } from "../../store/postsSlice";
import { useAppDispatch, useAppSelector } from "../../store/hooks";
import { makeRequest } from "../../utils/makeRequest";

type PostsProps = {
  userId?: number;
};

function Posts({ userId }: PostsProps) {
  const dispatch = useAppDispatch();
  const posts = useAppSelector((state) => state.posts);
  const currentUser = useAppSelector((state) => state.currentUser);

  useEffect(() => {
    const URL = userId ? `/posts?userId=${userId}` : "/posts";
    makeRequest(currentUser.token)
      .get(URL)
      .then((res) => {
        dispatch(setPosts(res.data));
      })
      .catch((err) => {
        notify.error(err.message);
      });
  }, [userId]);

  return (
    <div className="posts">
      {posts.map((post) => (
        <Post post={post} key={post.id} />
      ))}
    </div>
  );
}

export default Posts;
