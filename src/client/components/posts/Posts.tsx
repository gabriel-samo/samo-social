import "./posts.scss";
import React from "react";
import Post from "../post/Post";
import notify from "../../utils/Notify";
import { useEffect } from "react";
import { setPosts } from "../../store/postsSlice";
import { makeRequest } from "../../utils/makeRequest";
import { useAppDispatch, useAppSelector } from "../../store/hooks";

type PostsProps = {
  userId?: number;
};

function Posts({ userId }: PostsProps) {
  const dispatch = useAppDispatch();
  const posts = useAppSelector((state) => state.posts);
  const currentUser = useAppSelector((state) => state.currentUser);

  useEffect(() => {
    const URL = userId ? `/api/posts?userId=${userId}` : "/api/posts";
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
