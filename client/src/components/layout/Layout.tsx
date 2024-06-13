import "./layout.scss";
import Navbar from "../navbar/Navbar";
import LeftBar from "../leftBar/LeftBar";
import RightBar from "../rightBar/RightBar";
import { Outlet } from "react-router-dom";
import { useAppSelector } from "../../store/hooks";

function Layout() {
  const darkMode = useAppSelector((state) => state.darkMode);
  const theme = darkMode ? "dark" : "light";

  return (
    <div className={`layout theme-${theme}`}>
      <Navbar />
      <div className="bodyLayout">
        <LeftBar />
        <div className="middleSection">
          <Outlet />
        </div>
        <RightBar />
      </div>
    </div>
  );
}

export default Layout;
