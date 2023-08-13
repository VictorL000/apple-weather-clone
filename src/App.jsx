import { useState } from "react";
import "./App.css";


function App() {
  return (
    <>
      <Navbar></Navbar>
      <Hero />
      <HourlyForecast></HourlyForecast>
      <DailyForecast></DailyForecast>
    </>
  );
}

function Navbar() {
  return (
    <>
      <div className="navbarBG"></div>
      <div className="navbar">
        <div className="logo">Weather</div>
        <div className="searchBar"></div>
        <div className="toggleCF">
          <input type="checkbox" id="switch" />
          <label htmlFor="switch">Toggle Celsius Fahrenheit</label>
        </div>
      </div>
    </>
  );
}

function Hero() {
  const API_KEY = "398c0c5661ba432481b11820231008";
  let city = 'Toronto';
  const [currentTemp, setCurrentTemp] = useState();
  const [condition, setCondition] = useState();
  fetch(`https://api.weatherapi.com/v1/current.json?key=${API_KEY}&q=${city}`, {mode: 'cors'})
    .then((response) => {
      return (response.json());
    })
    .then((response) => {
      // console.log(response);
      setCurrentTemp(response.current.temp_c);
      setCondition(response.current.condition.text)
      console.log(currentTemp);
    })

  return (
    <>
      <div className="hero">
        <h2 className="cityName">{city}</h2>
        <h2 className="temperature">{currentTemp}°</h2>
        <h2 className="weatherDesc">{condition}</h2>
        <div className="highLow">
          <h2 className="highTemp">H: 25°</h2>
          <h2 className="lowTemp">L: 16°</h2>
        </div>
      </div>
    </>
  );
}

function HourlyForecast() {
  return (
    <div className="hourlyForecast">
      <HourlyModule></HourlyModule>
      <HourlyModule></HourlyModule>
      <HourlyModule></HourlyModule>
      <HourlyModule></HourlyModule>
      <HourlyModule></HourlyModule>
      <HourlyModule></HourlyModule>
      <HourlyModule></HourlyModule>
      <HourlyModule></HourlyModule>
      <HourlyModule></HourlyModule>
      <HourlyModule></HourlyModule>
      <HourlyModule></HourlyModule>
      <HourlyModule></HourlyModule>
    </div>
  )
}

function DailyForecast() {
  return (
    <div className="dailyForecast">
      <DailyModule></DailyModule>
      <DailyModule></DailyModule>
      <DailyModule></DailyModule>
    </div>
  )
}

function HourlyModule() {
  return (
      <div className="hourModule">
        <h3>Now</h3>
        <h3>☁</h3>
        <h3>24°</h3>
      </div>
  )
}

function DailyModule() {
  return (
    <div className="dayModule">
      <h3>Today</h3>
      <h3>☁</h3>
      <div className="weatherBar">
        <h3>15°</h3>
        <div className="weatherBarBG">
          <div className="weatherBarInner">
          </div>
        </div>
        <h3>28°</h3>
      </div>
    </div>
  )
}

export default App;
