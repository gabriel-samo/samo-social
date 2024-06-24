import "./comments.scss";
import React from "react";
// import axios from "axios";
import moment from "moment";
import notify from "../../utils/Notify";
import { useState } from "react";
import { useAppDispatch, useAppSelector } from "../../store/hooks";
import { addComment, allCommentsState } from "../../store/commentsSlice";
import { makeRequest } from "../../utils/makeRequest";

type CommentsProps = {
  postId?: number;
  comments?: allCommentsState[];
};

function Comments({ postId, comments }: CommentsProps) {
  const dispatch = useAppDispatch();
  const [desc, setDesc] = useState("");
  const currentUser = useAppSelector((state) => state.currentUser);

  const handleCLick = () => {
    const sendData = {
      desc,
      postId
    };
    makeRequest(currentUser.token)
      .post("/api/comments/add", sendData)
      // axios
      //   .post("http://localhost:3012/api/comments/add", sendData, {
      //     headers: {
      //       Authorization: currentUser.token
      //     }
      //   })
      .then((res) => {
        dispatch(addComment(res.data.addedComment));
        notify.success(res.data.msg);
        setDesc("");
      })
      .catch((err) => {
        notify.error(err.message);
      });
  };

  return (
    <div className="comments">
      <div className="write">
        <img src={currentUser.profilePic} alt="" />
        <input
          type="text"
          placeholder="Write a comment..."
          value={desc}
          onChange={(event) => {
            setDesc(event.target.value);
          }}
        />
        <button onClick={handleCLick}>Send</button>
      </div>
      {comments &&
        comments.map((comment: any) => (
          <div key={comment.id} className="comment">
            <img src={comment.profilePic} alt="" />
            <div className="info">
              <span>{comment.name}</span>
              <p>{comment.desc}</p>
            </div>
            <span className="date">{moment(comment.createdAt).fromNow()}</span>
          </div>
        ))}
    </div>
  );
}

export default Comments;
