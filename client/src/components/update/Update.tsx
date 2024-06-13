import "./update.scss";
import axios from "axios";
import notify from "../../utils/Notify";
import { Fade } from "@mui/material";
import { SyntheticEvent, useState } from "react";
import { loginUser } from "../../store/authSlice";
import { setProfile } from "../../store/profileSlice";
import CloudUploadIcon from "@mui/icons-material/CloudUpload";
import { useAppDispatch, useAppSelector } from "../../store/hooks";

type UpdateProps = {
  setOpenUpdate: (arg: boolean) => void;
  openUpdate: boolean;
};

type FormInputs = {
  email?: string;
  password?: string | null;
  name?: string;
  city?: string | null;
  website?: string | null;
};

function Update({ openUpdate, setOpenUpdate }: UpdateProps) {
  const dispatch = useAppDispatch();
  const currentUser = useAppSelector((state) => state.currentUser);
  const userProfile = useAppSelector((state) => state.profile);
  const [coverPic, setCoverPic] = useState<File | null>(null);
  const [profilePic, setProfilePic] = useState<File | null>(null);
  const [updateUserDetails, setUpdateUserDetails] = useState<FormInputs>({
    email: userProfile.email,
    password: null,
    name: userProfile.name,
    city: userProfile.city,
    website: userProfile.website
  });

  const upload = async (file: File) => {
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
      console.log(err);
    }
  };

  const handleChange = (event: SyntheticEvent) => {
    setUpdateUserDetails((prev) => ({
      ...prev,
      [(event.target as HTMLInputElement).name]: (
        event.target as HTMLInputElement
      ).value
    }));
    console.log(updateUserDetails);
  };

  const handleClick = async (event: SyntheticEvent) => {
    event.preventDefault();

    const coverPicUrl = coverPic
      ? `/uploads/${await upload(coverPic)}`
      : userProfile.coverPic;
    const profilePicUrl = profilePic
      ? `/uploads/${await upload(profilePic)}`
      : userProfile.profilePic;

    const userDetails = {
      ...updateUserDetails,
      profilePic: profilePicUrl,
      coverPic: coverPicUrl
    };

    axios
      .put(
        "http://localhost:3012/api/users/update/" + currentUser.id,
        userDetails,
        {
          headers: { Authorization: currentUser.token }
        }
      )
      .then((res) => {
        if (res.status === 200) {
          dispatch(loginUser(res.headers["authorization"]));
          return axios.get(
            "http://localhost:3012/api/users/find/" + currentUser.id,
            {
              headers: { Authorization: currentUser.token }
            }
          );
        }
      })
      .then((res) => {
        if (res) dispatch(setProfile(res.data));
      })
      .catch((error) => {
        console.log(error);
      });
    setOpenUpdate(false);
  };

  return (
    <div className="update">
      <Fade in={openUpdate}>
        <div className="wrapper">
          <h1>Update Your Profile</h1>
          <form>
            <div className="files">
              <label htmlFor="cover">
                <span>Cover Picture</span>
                <div className="imgContainer">
                  <img
                    src={
                      coverPic
                        ? URL.createObjectURL(coverPic)
                        : userProfile.coverPic
                    }
                    alt=""
                  />
                  <CloudUploadIcon className="icon" />
                </div>
              </label>
              <input
                type="file"
                id="cover"
                style={{ display: "none" }}
                onChange={(event) => {
                  setCoverPic(event?.target?.files && event.target.files[0]);
                }}
              />
              <label htmlFor="profile">
                <span>Profile Picture</span>
                <div className="imgContainer">
                  <img
                    src={
                      profilePic
                        ? URL.createObjectURL(profilePic)
                        : userProfile.profilePic
                    }
                    alt=""
                  />
                  <CloudUploadIcon className="icon" />
                </div>
              </label>
              <input
                type="file"
                id="profile"
                style={{ display: "none" }}
                onChange={(event) => {
                  setProfilePic(event?.target?.files && event.target.files[0]);
                }}
              />
            </div>
            <label>Email:</label>
            <input
              type="text"
              name="email"
              placeholder="Enter a new email"
              onChange={handleChange}
            />
            <label>Password:</label>
            <input
              type="password"
              name="password"
              placeholder="Enter a new password"
              onChange={handleChange}
            />
            <label>Name:</label>
            <input
              type="text"
              name="name"
              placeholder="Enter a new name"
              onChange={handleChange}
            />
            <label>Country / City:</label>
            <input
              type="text"
              name="city"
              placeholder="Enter a new city"
              onChange={handleChange}
            />
            <label>Website:</label>
            <input
              type="text"
              name="website"
              placeholder="Enter a new website"
              onChange={handleChange}
            />
            <button onClick={handleClick}>Update</button>
          </form>
          <button className="close" onClick={() => setOpenUpdate(false)}>
            close
          </button>
        </div>
      </Fade>
    </div>
  );
}

export default Update;
