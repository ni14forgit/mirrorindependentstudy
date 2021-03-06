import React from "react";
import "./WeatherApp.css";
import Titles from "./components/Titles";
import Form from "./components/Form";
import Weather from "./components/Weather";
import io from "socket.io-client";
let socket;

//const ENDPOINT = "localhost:5000";
const ENDPOINT = "https://pacific-atoll-21289.herokuapp.com";

const API_KEY = process.env.REACT_APP_WEATHER_API_KEY;
const GEO_KEY = process.env.REACT_APP_GEOLOCATION_API_KEY;
class WeatherApp extends React.Component {
  state = {
    temperature: undefined,
    city: undefined,
    country: undefined,
    humidity: undefined,
    description: undefined,
    error: undefined
  };

  componentDidMount() {
    this.intervalID = setInterval(() => this.tick(), 1000 * 60 * 30);
    socket = io(ENDPOINT);
    socket.on("getLocalWeather", () => {
      console.log("getLocalWeather-client");
      this.mobileGetWeather();
    });
    socket.emit("join");
  }

  componentDidUpdate() {
    this.intervalID = setInterval(() => this.tick(), 1000 * 60 * 30);
    // socket.on("weather", () => {
    //   console.log("wing");
    // });
  }

  componentWillUnmount() {
    socket.emit("disconnect");
    socket.off();
  }

  tick() {
    this.mobileGetWeather();
  }

  getWeather = async e => {
    e.preventDefault();
    const city = e.target.elements.city.value;
    const country = e.target.elements.country.value;
    const api_call = await fetch(
      `http://api.openweathermap.org/data/2.5/weather?q=${city},${country}&appid=${API_KEY}&units=metric`
    );
    const data = await api_call.json();
    if (city && country) {
      this.setState({
        temperature: data.main.temp,
        city: data.name,
        country: data.sys.country,
        humidity: data.main.humidity,
        description: data.weather[0].description,
        error: ""
      });
    } else {
      this.setState({
        temperature: undefined,
        city: undefined,
        country: undefined,
        humidity: undefined,
        description: undefined,
        error: "Please enter the values."
      });
    }
  };

  apiCallToWeather = async function(lat, lng) {
    const api_call = await fetch(
      `http://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lng}&appid=${API_KEY}&units=metric`
    ).catch(function(error) {
      console.log(error.message);
    });
    const data = await api_call.json();
    this.setState({
      temperature: data.main.temp,
      city: data.name,
      country: data.sys.country,
      humidity: data.main.humidity,
      description: data.weather[0].description,
      error: ""
    });
    console.log(data);
  };

  mobileGetWeather = async () => {
    var url = "https://ipinfo.io?token=" + GEO_KEY;
    //console.log(url);
    const api_call = await fetch(url);
    const data = await api_call.json();
    const location = data["loc"];
    const [lat, lng] = location.split(",");
    this.apiCallToWeather(lat, lng);
    // console.log(data);
    // console.log(location);
  };

  render() {
    return (
      <div>
        <div className="wrapper">
          <div className="main">
            <div className="container">
              <div className="row">
                <div className="col-xs-5 title-container">
                  {/* <Titles /> */}
                  {/* <button onClick={this.mobileGetWeather}>
                    Mobile Weather
                  </button> */}
                  <Weather
                    temperature={this.state.temperature}
                    humidity={this.state.humidity}
                    city={this.state.city}
                    country={this.state.country}
                    description={this.state.description}
                    error={this.state.error}
                  />
                </div>
                {/* <div className="col-xs-7 form-container"> */}
                {/* <Form getWeather={this.getWeather} /> */}
                {/* <button onClick={this.mobileGetWeather}>Mobile Weather</button>
                <Weather
                  temperature={this.state.temperature}
                  humidity={this.state.humidity}
                  city={this.state.city}
                  country={this.state.country}
                  description={this.state.description}
                  error={this.state.error}
                /> */}
                {/* </div> */}
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default WeatherApp;
