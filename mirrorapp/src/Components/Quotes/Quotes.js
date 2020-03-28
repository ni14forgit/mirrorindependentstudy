import React, { useState, useEffect } from "react";
import "./new.css";

const Quotes = () => {
  const [counter, setCounter] = useState(0);
  const [quote, setQuote] = useState(
    "Happiness is when what you think, what you say, and what you do are in harmony."
  );
  const [author, setAuthor] = useState("M. Gandhi");
  const [visibility, setVisibility] = useState(true);

  const types = [
    "inspire",
    "management",
    "sports",
    "life",
    "funny",
    "love",
    "art"
  ];

  const stylesgeneral = {
    paddingTop: "10%",
    paddingRight: "5%",
    paddingLeft: "5%"
  };

  const stylescredit = {
    color: "white",
    "text-align": "right",
    "padding-right": "2px"
  };

  // .fadeIn{
  //     opacity:1;
  //     width:100px;
  //     height:100px;
  //     transition: opacity 0.5s 0.5s opacity 0.5s 0.5s;

  // }

  useEffect(() => {
    const interval = setInterval(() => {
      getQuotes();
    }, 10 * 1000);
    return () => clearInterval(interval);
  });

  function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
  }

  const getQuotes = async e => {
    var url = "https://quotes.rest/qod?category=" + types[counter];
    console.log(url);
    const api_call = await fetch(url);
    const data = await api_call.json();
    const quotation = data["contents"]["quotes"][0]["quote"];
    const authordata = data["contents"]["quotes"][0]["author"];
    setVisibility(false);
    await sleep(4000);
    setQuote(quotation);
    setAuthor(authordata);
    setCounter((counter + 1) % types.length);
    setVisibility(true);
  };

  return (
    <div>
      <div style={stylesgeneral}>
        <div>
          <p className={visibility ? "fadeInBig" : "fadeOutBig"}>{quote}</p>
          <p className={visibility ? "fadeIn" : "fadeOut"}>{author}</p>
        </div>
      </div>
    </div>
  );
};

export default Quotes;
