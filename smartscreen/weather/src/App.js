import React from "react";

import Titles from "./components/Titles";
import Form from "./components/Form";
import Weather from "./components/Weather";
import io from "socket.io-client";
let socket;

const ENDPOINT = "http://localhost:5000";

const API_KEY = "f58c25cc9e885c84a718f9d225c72ecb";
class App extends React.Component {
  state = {
    temperature: undefined,
    city: undefined,
    country: undefined,
    humidity: undefined,
    description: undefined,
    error: undefined
  };

  componentDidMount() {
    this.intervalID = setInterval(() => this.tick(), 3600000);
    socket = io(ENDPOINT);
    socket.on("weather", () => {
      console.log("wing");
      this.mobileGetWeather();
    });
    socket.emit("join");
  }

  componentDidUpdate() {
    this.intervalID = setInterval(() => this.tick(), 3600000);
    // socket.on("weather", () => {
    //   console.log("wing");
    // });
  }

  componentWillUnmount() {
    socket.emit("disconnect");
    socket.off();
  }

  tick() {
    this.timedWeather();
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

  apiCallToWeather = async function(position) {
    const lng = position.coords.longitude;
    const lat = position.coords.latitude;
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

  mobileGetWeather = () => {
    let func = this.apiCallToWeather.bind(this);
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(func);
    } else {
      console.log("not supported");
    }
  };

  getGeolocatedWeather = e => {
    e.preventDefault();
    let func = this.apiCallToWeather.bind(this);
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(func);
    } else {
      console.log("not supported");
    }
  };

  timedWeather = () => {
    //console.log("hi");
    let func = this.apiCallToWeather.bind(this);
    if (navigator.geolocation) {
      //navigator.geolocation.getCurrentPosition(displayLocationInfo);
      navigator.geolocation.getCurrentPosition(func);
    } else {
      console.log("not supported");
    }
  };

  render() {
    return (
      <div>
        <div className="wrapper">
          <div className="main">
            <div className="container">
              <div className="row">
                <div className="col-xs-5 title-container">
                  <Titles />
                </div>
                <div className="col-xs-7 form-container">
                  <Form getWeather={this.getWeather} />
                  <button onClick={this.getGeolocatedWeather}>
                    Your Weather
                  </button>
                  <Weather
                    temperature={this.state.temperature}
                    humidity={this.state.humidity}
                    city={this.state.city}
                    country={this.state.country}
                    description={this.state.description}
                    error={this.state.error}
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default App;
