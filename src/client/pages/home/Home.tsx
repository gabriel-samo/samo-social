import "./home.scss";
import React from "react";
import Share from "../../components/share/Share";
import Posts from "../../components/posts/Posts";
import Stories from "../../components/stories/Stories";

function Home() {
  return (
    <div className="home">
      <Stories />
      <Share />
      <Posts />
    </div>
  );
}

export default Home;
