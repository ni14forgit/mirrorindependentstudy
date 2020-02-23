import Img from "react-image";
import React from "react";
import "./News.css";

const News = props => {
  const story = props.storyentry;

  console.log(story.imageUrl.width);

  return (
    <div>
      <img className="img" src={story.imageUrl}></img>
      <p className="title">{story.title}</p>
      <p className="author">{story.author}</p>
      <p className="source">{story.source}</p>
      <p className="newsAPI">News API Google</p>
    </div>
  );
};

export default News;
