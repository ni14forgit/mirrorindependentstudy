import Img from "react-image";
import React from "react";
import "./News.css";

const News = props => {
  const story = props.storyentry;
  const visibility = props.visi;

  return (
    <div>
      <img
        className={visibility ? "fadeInImg" : "fadeOutImg"}
        src={story.imageUrl}
      ></img>
      <p className={visibility ? "fadeInTitle" : "fadeOutTitle"}>
        {story.title}
      </p>
      <p className={visibility ? "fadeInAuthor" : "fadeOutAuthor"}>
        {story.author}
      </p>
      <p className={visibility ? "fadeInSource" : "fadeOutSource"}>
        {story.source}
      </p>
      <p className="newsAPI">News API Google</p>
    </div>
  );
};

export default News;
