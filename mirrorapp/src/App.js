import React, { useEffect } from "react";
import { Route, Link, useHistory } from "react-router-dom";
import Quotes from "./Components/Quotes/Quotes";
import NewsApp from "./Components/News/NewsApp";
import WeatherApp from "./Components/Weather/WeatherApp";
import Acne from "./Components/Acne/Acne";
import io from "socket.io-client";
import "./App.css";
let socket;

const ENDPOINT = "https://pacific-atoll-21289.herokuapp.com";

function App() {
  const history = useHistory();

  var quotes = <Quotes></Quotes>;
  var acne = <Acne></Acne>;
  var news = <NewsApp></NewsApp>;
  var weather = <WeatherApp></WeatherApp>;

  useEffect(() => {
    socket = io(ENDPOINT);
    socket.on("weather-navigate", () => {
      clickWeather();
      console.log("weather-navigate-client");
    });
    socket.on("acne-navigate", () => {
      clickAcne();
      console.log("acne-navigate-client");
    });
    socket.on("quotes-navigate", () => {
      clickQuotes();
      console.log("acne-navigate-client");
    });
    socket.on("news-navigate", () => {
      clickNews();
      console.log("news-navigate-client");
    });
    socket.emit("join");
  }, []);

  const clickAcne = () => {
    history.push("/acne");
  };

  const clickWeather = () => {
    history.push("/weather");
  };

  const clickQuotes = () => {
    history.push("/inspiration");
  };

  const clickNews = () => {
    history.push("/news");
  };

  return (
    <div>
      <header>
        <nav>
          <ul>
            <button onClick={clickAcne}>acne</button>
            <button onClick={clickWeather}>weather</button>
            <button onClick={clickQuotes}>quotes</button>
            <button onClick={clickNews}>news</button>
            <li>
              <Link to="/">Home</Link>
            </li>
            {/* <li>
              <Link to="/acne">acne</Link>
            </li>
            <li>
              <Link to="/weather">weather</Link>
            </li>
            <li>
              <Link to="/inspiration">quotes</Link>
            </li>
            <li>
              <Link to="/news">news</Link>
            </li> */}
          </ul>
        </nav>
      </header>
      <Route path="/acne" render={() => acne} />
      <Route path="/weather" render={() => weather} />
      <Route path="/inspiration" render={() => quotes} />
      <Route path="/news" render={() => news} />
    </div>
  );
}

export default App;
