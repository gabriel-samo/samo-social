import "./share.scss";
import axios from "axios";
import Image from "../../assets/img.png";
import Map from "../../assets/map.png";
import Friend from "../../assets/friend.png";
import notify from "../../utils/Notify";
import { addPost } from "../../store/postsSlice";
import { FormEvent, useState } from "react";
import { useAppDispatch, useAppSelector } from "../../store/hooks";

const Share = () => {
  const currentUser = useAppSelector((state) => state.currentUser);
  const dispatch = useAppDispatch();
  const [desc, setDesc] = useState<string>("");
  const [file, setFile] = useState<File | null>(null);

  const upload = async () => {
    try {
      const formData = new FormData();
      if (file) formData.append("file", file);
      const res = await axios.post(
        "http://localhost:3012/api/upload",
        formData
      );
      return res.data;
    } catch (err: any) {
      notify.error(err.message);
    }
  };

  const handleSubmit = async (event: FormEvent) => {
    event.preventDefault();
    const imgUrl = await upload();
    const sendData = {
      desc,
      img: imgUrl ? imgUrl : ""
    };
    axios
      .post("http://localhost:3012/api/posts/add", sendData, {
        headers: {
          Authorization: currentUser.token
        }
      })
      .then((res) => {
        setDesc("");
        setFile(null);
        dispatch(addPost(res.data.addedPost));
        notify.success(res.data.msg);
      })
      .catch((err) => {
        if (err.response) notify.error(err.response.data.msg);
        else notify.error(err);
      });
  };

  return (
    <div className="share">
      <div className="container">
        <form onSubmit={handleSubmit}>
          <div className="top">
            <div className="left">
              <img src={currentUser.profilePic} alt="" />
              <input
                type="text"
                placeholder={`What's on your mind ${currentUser.name}?`}
                onChange={(event) => {
                  setDesc(event.target.value);
                }}
                value={desc}
                required={true}
              />
            </div>
            <div className="right">
              {file && (
                <img className="file" alt="" src={URL.createObjectURL(file)} />
              )}
            </div>
          </div>
          <hr />
          <div className="bottom">
            <div className="left">
              <input
                type="file"
                id="file"
                style={{ display: "none" }}
                onChange={(event) => {
                  event.target.files && setFile(event.target.files[0]);
                }}
              />
              <label htmlFor="file">
                <div className="item">
                  <img src={Image} alt="" />
                  <span>Add Image</span>
                </div>
              </label>
              <div className="item">
                <img src={Map} alt="" />
                <span>Add Place</span>
              </div>
              <div className="item">
                <img src={Friend} alt="" />
                <span>Tag Friends</span>
              </div>
            </div>
            <div className="right">
              <button>Share</button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Share;
