import React, { useState, useEffect } from "react";
import News from "./News/News";
import "./News/News.css";

class Story {
  constructor(title, author, source, imageUrl) {
    this.title = title;
    this.author = author;
    this.source = source;
    this.imageUrl = imageUrl;
  }
}

const App = () => {
  const [stories, setStories] = useState([]);
  const [story, setStory] = useState(new Story("0", "0", "0", "0"));
  const [counter, setCounter] = useState(0);
  const [visibility, setVisibility] = useState(true);

  const getNews = async e => {
    //console.log("hi" + process.env.REACT_APP_API_KEY_NEWS);
    setStories([]);
    var url =
      "http://newsapi.org/v2/top-headlines?country=us&apiKey=" +
      process.env.REACT_APP_API_KEY_NEWS;
    const api_call = await fetch(url);
    const data = await api_call.json();
    console.log(data);
    for (var i = 0; i < data["articles"].length; i++) {
      const td = data["articles"][i]["title"];
      const ad = data["articles"][i]["author"];
      const sd = data["articles"][i]["source"]["name"];
      const id = data["articles"][i]["urlToImage"];

      // const titleData = td ? td : "Title Not Specified";
      // const authorData = ad ? ad : "Author Not Specified";
      // const sourceData = sd ? sd : "Source Not Specified";
      // const imageUrlData = id ? id : "Article Image Not Specified";

      const titleData = td ? td : "";
      const authorData = ad ? ad : "";
      const sourceData = sd ? sd : "";
      const imageUrlData = id ? id : "";

      const newstory = new Story(
        titleData,
        authorData,
        sourceData,
        imageUrlData
      );

      setStories(oldArray => [...oldArray, newstory]);
      console.log(stories.length);
    }
  };

  function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
  }

  const updateStory = async () => {
    setVisibility(false);
    await sleep(5000);
    setStory(stories[counter]);
    setCounter((counter + 1) % stories.length);
    setVisibility(true);
  };

  useEffect(() => {
    const interval = setInterval(() => {
      updateStory();
    }, 10 * 1000);
    return () => clearInterval(interval);
  });

  useEffect(() => {
    getNews();
  }, []);

  useEffect(() => {
    const interval = setInterval(() => {
      getNews();
    }, 350 * 1000);
    return () => clearInterval(interval);
  });

  return <News visi={visibility} storyentry={story}></News>;
};

export default App;
