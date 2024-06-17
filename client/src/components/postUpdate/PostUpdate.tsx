import "./postUpdate.scss";
import notify from "../../utils/Notify";
import CloudUploadIcon from "@mui/icons-material/CloudUpload";
import { Fade } from "@mui/material";
import { SyntheticEvent, useState } from "react";
import { postState, setPosts } from "../../store/postsSlice";
import { makeRequest } from "../../utils/makeRequest";
import { useAppDispatch, useAppSelector } from "../../store/hooks";

type PostUpdateProps = {
  setOpenPostUpdate: (arg: boolean) => void;
  openPostUpdate: boolean;
  post: postState;
};

function PostUpdate({
  openPostUpdate,
  setOpenPostUpdate,
  post
}: PostUpdateProps) {
  const dispatch = useAppDispatch();
  const currentUser = useAppSelector((state) => state.currentUser);

  const [postImg, setPostImg] = useState<File | null>(null);
  const [updatedDesc, setUpdatedDesc] = useState<string | undefined>(post.desc);

  const upload = async (file: File) => {
    try {
      const formData = new FormData();
      if (file) formData.append("file", file);
      const res = await makeRequest().post("/upload", formData);
      return res.data;
    } catch (err: any) {
      notify.error(err.message);
      console.log(err);
    }
  };

  const handleClick = async (event: SyntheticEvent) => {
    event.preventDefault();

    const postImgURL = postImg ? `${await upload(postImg)}` : post.img;

    const postDetails = {
      desc: updatedDesc,
      img: postImgURL
    };

    makeRequest(currentUser.token)
      .patch("/posts/update/" + post.id, postDetails)
      .then((res) => {
        if (res.status === 200) {
          return makeRequest(currentUser.token).get("/posts");
        }
      })
      .then((res) => {
        if (res) dispatch(setPosts(res.data));
      })
      .catch((error) => {
        console.log(error);
      });
    setOpenPostUpdate(false);
  };

  return (
    <div className="postUpdate">
      <Fade in={openPostUpdate}>
        <div className="wrapper">
          <h1>Update Your Post</h1>
          <form>
            <div className="files">
              <label htmlFor="postImg">
                <span>Post Image</span>
                <div className="imgContainer">
                  <img
                    src={postImg ? URL.createObjectURL(postImg) : `${post.img}`}
                    alt=""
                  />
                  <CloudUploadIcon className="icon" />
                </div>
              </label>
              <input
                type="file"
                id="postImg"
                style={{ display: "none" }}
                onChange={(event) => {
                  setPostImg(event?.target?.files && event.target.files[0]);
                }}
              />
            </div>
            <label>Post Description:</label>
            <input
              type="text"
              name="desc"
              placeholder="Enter new post description"
              onChange={(e) => {
                setUpdatedDesc(e.target.value);
              }}
            />
            <button onClick={handleClick}>Update</button>
          </form>
          <button className="close" onClick={() => setOpenPostUpdate(false)}>
            close
          </button>
        </div>
      </Fade>
    </div>
  );
}

export default PostUpdate;
