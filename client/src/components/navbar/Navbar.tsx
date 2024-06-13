import "./navbar.scss";
import HomeOutlinedIcon from "@mui/icons-material/HomeOutlined";
import EmailOutlinedIcon from "@mui/icons-material/EmailOutlined";
import PersonOutlinedIcon from "@mui/icons-material/PersonOutlined";
import SearchOutlinedIcon from "@mui/icons-material/SearchOutlined";
import WbSunnyOutlinedIcon from "@mui/icons-material/WbSunnyOutlined";
import GridViewOutlinedIcon from "@mui/icons-material/GridViewOutlined";
import DarkModeOutlinedIcon from "@mui/icons-material/DarkModeOutlined";
import NotificationsOutlinedIcon from "@mui/icons-material/NotificationsOutlined";
import { Link } from "react-router-dom";
import { logoutUser } from "../../store/authSlice";
import { removePosts } from "../../store/postsSlice";
import { removeProfile } from "../../store/profileSlice";
import { toggleDarkMode } from "../../store/darkModeSlice";
import { removeComments } from "../../store/commentsSlice";
import { useAppDispatch, useAppSelector } from "../../store/hooks";

function Navbar() {
  const dispatch = useAppDispatch();
  let darkMode = useAppSelector((state) => state.darkMode);
  const currentUser = useAppSelector((state) => state.currentUser);

  const toggle = () => {
    dispatch(toggleDarkMode());
    darkMode = !darkMode;
  };

  const logout = () => {
    dispatch(logoutUser());
    dispatch(removePosts());
    dispatch(removeProfile());
    dispatch(removeComments());
  };

  return (
    <div className="navbar">
      <div className="left">
        <Link to="/">
          <span>samo-social</span>
        </Link>
        <HomeOutlinedIcon />
        <div className="toggle">
          {darkMode ? (
            <WbSunnyOutlinedIcon onClick={toggle} />
          ) : (
            <DarkModeOutlinedIcon onClick={toggle} />
          )}
        </div>
        <GridViewOutlinedIcon />
        <div className="search">
          <SearchOutlinedIcon />
          <input type="text" placeholder="Search..." />
        </div>
      </div>
      <div className="right">
        <PersonOutlinedIcon />
        <EmailOutlinedIcon />
        <NotificationsOutlinedIcon />
        <div className="user">
          <img
            style={{ cursor: "pointer" }}
            src={currentUser.profilePic}
            onClick={logout}
          />
          <span>{currentUser.name}</span>
        </div>
      </div>
    </div>
  );
}

export default Navbar;
