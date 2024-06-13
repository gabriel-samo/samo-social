import "./profile.scss";
import Posts from "../../components/posts/Posts";
import PlaceIcon from "@mui/icons-material/Place";
import TwitterIcon from "@mui/icons-material/Twitter";
import LinkedInIcon from "@mui/icons-material/LinkedIn";
import LanguageIcon from "@mui/icons-material/Language";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import PinterestIcon from "@mui/icons-material/Pinterest";
import InstagramIcon from "@mui/icons-material/Instagram";
import EmailOutlinedIcon from "@mui/icons-material/EmailOutlined";
import FacebookTwoToneIcon from "@mui/icons-material/FacebookTwoTone";
import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { setProfile } from "../../store/profileSlice";
import { useAppDispatch, useAppSelector } from "../../store/hooks";
import {
  addRelationship,
  setRelationships
} from "../../store/relationshipsSlice";
import Update from "../../components/update/Update";
import { makeRequest } from "../../utils/makeRequest";

function Profile() {
  const params = useParams();
  const { userId } = params;
  const dispatch = useAppDispatch();
  const userProflie = useAppSelector((state) => state.profile);
  const currentUser = useAppSelector((state) => state.currentUser);
  const userFollowers = useAppSelector((state) => state.relationships).find(
    (item) => item.followedUserId === +userId!
  );
  const [openUpdate, setOpenUpdate] = useState(false);

  useEffect(() => {
    makeRequest(currentUser.token)
      .get("/users/find/" + userId)
      .then((res) => {
        dispatch(setProfile(res.data));
        return makeRequest().get("/relationships/?followedUserId=" + userId);
      })
      .then((res) => {
        dispatch(
          setRelationships({
            followedUserId: +userId!,
            followersUserIds: res.data
          })
        );
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  const isFollowing = userFollowers?.followersUserIds?.includes(
    currentUser.id!
  );

  const handleFollow = () => {
    makeRequest(currentUser.token)
      .post("/relationships/add/", {
        userId: parseInt(userId!)
      })
      .then((res) => {
        if (res.data.addedRelationship) {
          const { followerUserId, followedUserId } = res.data.addedRelationship;
          dispatch(addRelationship({ followedUserId, followerUserId }));
        } else {
          return makeRequest().get("/relationships/?followedUserId=" + userId);
        }
      })
      .then((res) => {
        if (res)
          dispatch(
            setRelationships({
              followedUserId: +userId!,
              followersUserIds: res.data
            })
          );
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const defaultCoverPic =
    "https://cdn.pixabay.com/photo/2018/01/13/13/12/coming-soon-3080102_1280.png";
  const deafultProilePic =
    "https://cdn.pixabay.com/photo/2023/05/02/10/35/avatar-7964945_960_720.png";

  return (
    <div className="profile">
      <div className="images">
        <img
          src={userProflie.coverPic ? userProflie.coverPic : defaultCoverPic}
          alt=""
          className="cover"
        />
        <img
          src={
            userProflie.profilePic ? userProflie.profilePic : deafultProilePic
          }
          alt=""
          className="profilePic"
        />
      </div>
      <div className="profileContainer">
        <div className="uInfo">
          <div className="left">
            <a href="http://facebook.com" target="blank">
              <FacebookTwoToneIcon fontSize="medium" />
            </a>
            <a href="http://instagram.com" target="blank">
              <InstagramIcon fontSize="medium" />
            </a>
            <a href="http://twitter.com" target="blank">
              <TwitterIcon fontSize="medium" />
            </a>
            <a href="http://linkedin.com" target="blank">
              <LinkedInIcon fontSize="medium" />
            </a>
            <a href="http://pinterest.com" target="blank">
              <PinterestIcon fontSize="medium" />
            </a>
          </div>
          <div className="center">
            <span>{userProflie.name}</span>
            <div className="info">
              <div className="item">
                <PlaceIcon />
                <span>{userProflie.city}</span>
              </div>
              <div className="item">
                <LanguageIcon />
                <span>{userProflie.website}</span>
              </div>
            </div>
            {currentUser.id == userProflie.id ? (
              <button onClick={() => setOpenUpdate(true)}>Update</button>
            ) : (
              <button onClick={handleFollow}>
                {isFollowing ? "Unfollow" : "Follow"}
              </button>
            )}
          </div>
          <div className="right">
            <EmailOutlinedIcon />
            <MoreVertIcon />
          </div>
        </div>
        <Posts userId={+userId!} />
      </div>
      {openUpdate && (
        <Update openUpdate={openUpdate} setOpenUpdate={setOpenUpdate} />
      )}
    </div>
  );
}

export default Profile;
