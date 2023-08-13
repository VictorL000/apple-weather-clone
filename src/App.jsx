import { useState } from "react";
import "./App.css";

function App() {
  return (
    <>
      <Navbar></Navbar>
      <Hero />
      <HourlyForecast></HourlyForecast>

    </>
  );
}

function Navbar() {
  return (
    <>
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
  return (
    <>
      <div className="hero">
        <h2 className="cityName">Toronto</h2>
        <h2 className="temperature">24°</h2>
        <h2 className="weatherDesc">Cloudy</h2>
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

function HourlyModule() {
  return (
      <div className="hourModule">
        <h3>Now</h3>
        <h3>☁</h3>
        <h3>24°</h3>
      </div>
  )

}
export default App;
