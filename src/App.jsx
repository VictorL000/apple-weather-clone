import { useState } from "react";
import "./App.css";
import PropTypes from "prop-types";
import clearImg from "./assets/clear2.jpg";
import sunnyImg from "./assets/sunny.jpg";
import rainyImg from "./assets/rainy.jpg";
import snowyImg from "./assets/snowy.jpg";
import cloudyImg from "./assets/cloudy.jpg";
import icon from "./assets/favicon.ico";
import circleImg from "./assets/circle.svg";

const FORECASTDAYS = 7;
const CITY = "toronto-ontario-canada";
const API_KEY = "398c0c5661ba432481b11820231008";
const SEARCHTIMEOUTMS = 300;

function convert24to12(time) {
  if (time === "Now") return time;
  return (
    <>
      {time % 12 === 0 ? "12" : time % 12}
      <span className="ampm">{time < 12 ? "AM" : "PM"}</span>
    </>
  );
}

const bgLookup = {
  1000: `url(${sunnyImg} )`,
  1001: `url(${clearImg} )`,
  1003: `url(${cloudyImg} )`,
  1006: `url(${cloudyImg} )`,
  1009: `url(${cloudyImg} )`,
  1030: `url(${cloudyImg} )`,
  1063: `url(${sunnyImg} )`,
  1066: `url(${cloudyImg} )`,
  1069: `url(${cloudyImg} )`,
  1072: `url(${cloudyImg} )`,
  1087: `url(${cloudyImg} )`,
  1114: `url(${rainyImg} )`,
  1117: `url(${snowyImg} )`,
  1135: `url(${cloudyImg} )`,
  1147: `url(${cloudyImg} )`,
  1150: `url(${rainyImg} )`,
  1153: `url(${rainyImg} )`,
  1168: `url(${rainyImg} )`,
  1171: `url(${rainyImg} )`,
  1180: `url(${rainyImg} )`,
  1183: `url(${rainyImg} )`,
  1186: `url(${rainyImg} )`,
  1189: `url(${rainyImg} )`,
  1192: `url(${rainyImg} )`,
  1195: `url(${rainyImg} )`,
  1198: `url(${rainyImg} )`,
  1201: `url(${rainyImg} )`,
  1204: `url(${snowyImg} )`,
  1207: `url(${snowyImg} )`,
  1210: `url(${snowyImg} )`,
  1213: `url(${snowyImg} )`,
  1216: `url(${snowyImg} )`,
  1219: `url(${snowyImg} )`,
  1222: `url(${snowyImg} )`,
  1225: `url(${snowyImg} )`,
  1237: `url(${snowyImg} )`,
  1240: `url(${rainyImg} )`,
  1243: `url(${rainyImg} )`,
  1246: `url(${rainyImg} )`,
  1249: `url(${rainyImg} )`,
  1252: `url(${rainyImg} )`,
  1255: `url(${sunnyImg} )`,
  1258: `url(${sunnyImg} )`,
  1261: `url(${sunnyImg} )`,
  1264: `url(${sunnyImg} )`,
  1273: `url(${rainyImg} )`,
  1276: `url(${rainyImg} )`,
  1279: `url(${snowyImg} )`,
  1282: `url(${snowyImg} )`,
};

function Copyright() {
  return (
    <p className="copyright">
      Made with &lt;3 using <a href="https://react.dev/">React</a> and{" "}
      <a href="https://www.weatherapi.com/">WeatherAPI.com</a>.{" "}
      <a href="https://victorl000.github.io/">VictorL000</a>, 2023.
    </p>
  );
}

function App() {
  let [unit, setUnit] = useState("c");
  let [searchTerm, setSearchTerm] = useState(CITY);
  return (
    <>
      <Navbar setSearchTerm={setSearchTerm} unit={unit} setUnit={setUnit}></Navbar>
      <Hero searchTerm={searchTerm} unit={unit} />
      <HourlyForecast searchTerm={searchTerm} unit={unit}></HourlyForecast>
      <DailyForecast searchTerm={searchTerm} unit={unit}></DailyForecast>
      <Copyright></Copyright>
    </>
  );
}

function Navbar({ unit, setUnit, setSearchTerm }) {
  return (
    <>
      <div className="navbarBG"></div>
      <div className="navbar">
        <div className="logo">
          <img src={icon} />
        </div>
        <SearchBar setSearchTerm={setSearchTerm}></SearchBar>
        <CFButton unit={unit} setUnit={setUnit}></CFButton>
      </div>
    </>
  );
}

Navbar.propTypes = {
  unit: PropTypes.string,
  setUnit: PropTypes.func,
  setSearchTerm: PropTypes.func,
};

function SearchBar({ setSearchTerm }) {
  const [searchResults, setSearchResults] = useState([]);
  const [time, setTime] = useState();
  const [focused, setFocused] = useState(false);
  var sched = "";

  function handleChange(e) {
    sched = e.target.value;
    resetTimer();
  }

  function handleSearch() {
    if (sched === "") {
      setSearchResults([]);
      return;
    }
    getSearchResults(sched).then((response) => {
      setSearchResults(response);
    });
  }

  async function getSearchResults(searchTerm) {
    const response = await fetch(
      `https://api.weatherapi.com/v1/search.json?key=${API_KEY}&q=${searchTerm}`,
      { mode: "cors" }
    );
    return response.json();
  }

  function resetTimer() {
    clearTimeout(time);
    setTime(
      setTimeout(() => {
        handleSearch();
      }, SEARCHTIMEOUTMS)
    );
  }

  function commitSearchResult(result) {
    if (result === undefined) return;
    setSearchTerm(result.url);
    document.getElementById("searchbar").value = "";
    sched = "";
    setSearchResults([]);
  }

  function SearchResults() {
    if (searchResults.length === 0 || !focused) {
      return;
    }
    return (
      <>
        <div className="resultsbg">
          {searchResults.map((r) => {
            return (
              <button
                className="result"
                key={r.id}
                onClick={() => {
                  commitSearchResult(r);
                }}
              >
                <h3>{r.name + ", " + r.region}</h3>
              </button>
            );
          })}
        </div>
        <div className="unfocus" onClick={onBlur}></div>
      </>
    );
  }

  function handleEnter(e) {
    if (e.code === "Enter") {
      setSearchTerm(e.target.value);
    }
  }
  SearchResults.propTypes = {
    searchResults: PropTypes.array,
  };
  const onFocus = () => {
    setFocused(true);
    console.log("focused");
  };
  const onBlur = (e) => {
    // if (e.relatedTarget !== null) return;
    setFocused(false);
    console.log("un focused");
  };
  return (
    <>
      <div className="searchBar" onFocus={onFocus}>
        <input
          id="searchbar"
          type="text"
          name=""
          placeholder="Search"
          onChange={handleChange}
          onKeyDown={handleEnter}
        />
        <label hidden={true} htmlFor="searchbar">
          Search
        </label>
        {searchResults.length !== 0 ? <SearchResults></SearchResults> : ""}
      </div>
    </>
  );
}

SearchBar.propTypes = { setSearchTerm: PropTypes.func };

function Hero({ searchTerm, unit }) {
  const [currentTempCondition, setCurrentTempCondition] = useState({});

  if (!("searchTerm" in currentTempCondition) || currentTempCondition.searchTerm !== searchTerm) {
    fetch(
      `https://api.weatherapi.com/v1/forecast.json?key=${API_KEY}&q=${searchTerm}&days=${FORECASTDAYS}`,
      { mode: "cors" }
    )
      .then((response) => {
        return response.json();
      })
      .then((response) => {
        // If its "sunny" and nighttime, set code to 1001
        changeBG(
          response.current.condition.code === 1000 && response.current.is_day === 0
            ? 1001
            : response.current.condition.code
        );
        console.log("hero fetch " + searchTerm);
        setCurrentTempCondition({
          searchTerm,
          location: response.location.name,
          temp_c: response.current.temp_c,
          temp_f: response.current.temp_f,
          condition: response.current.condition.text,
          low_c: response.forecast.forecastday[0].day.mintemp_c,
          low_f: response.forecast.forecastday[0].day.mintemp_f,
          high_c: response.forecast.forecastday[0].day.maxtemp_c,
          high_f: response.forecast.forecastday[0].day.maxtemp_f,
        });
      })
      .catch((response) => {
        console.log("Error: " + response);
      });
  }
  return (
    <>
      <div className="hero">
        <h1 className="cityName">{currentTempCondition.location}</h1>
        <div>
          <h2 className="temperature">
            {Math.round(unit === "c" ? currentTempCondition.temp_c : currentTempCondition.temp_f)}
            <span className="degree">°</span>
          </h2>
        </div>
        <h2 className="weatherDesc">{currentTempCondition.condition}</h2>
        <div className="highLow">
          <h2 className="highTemp">
            H:{Math.round(unit === "c" ? currentTempCondition.high_c : currentTempCondition.high_f)}
            °
          </h2>
          <h2 className="lowTemp">
            L:{Math.round(unit === "c" ? currentTempCondition.low_c : currentTempCondition.low_f)}°
          </h2>
        </div>
      </div>
    </>
  );
}

Hero.propTypes = {
  unit: PropTypes.string,
  searchTerm: PropTypes.string,
};

function HourlyForecast({ searchTerm, unit }) {
  const [hourModules, setModules] = useState([]);

  if (hourModules.length === 0 || hourModules[0].searchTerm !== searchTerm) {
    fetch(
      `https://api.weatherapi.com/v1/forecast.json?key=${API_KEY}&q=${searchTerm}&days=${FORECASTDAYS}`,
      { mode: "cors" }
    )
      .then((response) => {
        return response.json();
      })
      .then((response) => {
        let current = new Date(response.current.last_updated);
        let currentHour = current.getHours();
        console.log("Hourly forecast fetched");
        let hourModTemp = [];

        response.forecast.forecastday[0].hour
          .slice(currentHour)
          .concat(response.forecast.forecastday[1].hour.slice(0, currentHour + 1))
          .forEach((e) => {
            hourModTemp.push({
              time: String(new Date(e.time).getHours()),
              condition: e.condition.text,
              conditionSrc: e.condition.icon,
              temp_c: e.temp_c,
              temp_f: e.temp_f,
              searchTerm,
            });
          });
        hourModTemp[0].time = "Now";
        setModules(hourModTemp);
      });
  }
  return (
    <div className="hourlyForecastContainer">
      <div className="tooltip">
        <h4>HOURLY FORECAST</h4>
      </div>
      <div className="hourlyForecast">
        {hourModules.map((mod) => (
          <HourlyModule
            unit={unit}
            key={mod.time}
            weather={{ ...mod, temp: unit === "c" ? mod.temp_c : mod.temp_f }}
          ></HourlyModule>
        ))}
      </div>
    </div>
  );
}

HourlyForecast.propTypes = {
  unit: PropTypes.string,
  searchTerm: PropTypes.string,
};

function HourlyModule(props) {
  return (
    <div className="hourModule">
      <h3>{convert24to12(props.weather.time)}</h3>
      <img src={"http:" + props.weather.conditionSrc} alt={props.weather.condition} />
      <h3>{Math.round(props.weather.temp)}°</h3>
    </div>
  );
}

HourlyModule.propTypes = {
  weather: PropTypes.shape({
    time: PropTypes.string.isRequired,
    condition: PropTypes.string,
    conditionSrc: PropTypes.string,
    temp_c: PropTypes.number,
    temp_f: PropTypes.number,
    temp: PropTypes.number,
  }),
  unit: PropTypes.string,
};

HourlyModule.defaultProps = {
  weather: {
    time: "Now",
    condition: "☁",
    conditionSrc: "",
    temp: 25,
  },
};

function DailyForecast({ searchTerm, unit }) {
  const [dayModules, setDayModules] = useState([]);

  if (dayModules.length === 0 || dayModules[0].searchTerm !== searchTerm) {
    fetch(
      `https://api.weatherapi.com/v1/forecast.json?key=${API_KEY}&q=${searchTerm}&days=${FORECASTDAYS}`,
      { mode: "cors" }
    )
      .then((response) => {
        return response.json();
      })
      .then((response) => {
        // if (dayModules.length !== 0) return;
        console.log("fetched in daily forecast ");
        let dayModTemp = [];
        let weekLow_c = 1000;
        let weekHigh_c = -1000;
        let weekLow_f = 1000;
        let weekHigh_f = -1000;
        response.forecast.forecastday.forEach((e) => {
          weekLow_c = Math.min(weekLow_c, e.day.mintemp_c);
          weekHigh_c = Math.max(weekHigh_c, e.day.maxtemp_c);

          weekLow_f = Math.min(weekLow_f, e.day.mintemp_f);
          weekHigh_f = Math.max(weekHigh_f, e.day.maxtemp_f);
        });
        response.forecast.forecastday.forEach((e) => {
          dayModTemp.push({
            searchTerm,
            date: getDayName(e.date, "en-US"),
            condition: e.day.condition.text,
            conditionSrc: e.day.condition.icon,
            low_c: e.day.mintemp_c,
            high_c: e.day.maxtemp_c,
            low_f: e.day.mintemp_f,
            high_f: e.day.maxtemp_f,
            weekLow_c,
            weekLow_f,
            weekHigh_c,
            weekHigh_f,
          });
        });

        dayModTemp[0].date = "Today";
        dayModTemp[0].temp_c = response.current.temp_c;
        dayModTemp[0].temp_f = response.current.temp_f;
        setDayModules(dayModTemp);
      });
  }
  return (
    <div className="dailyForecastContainer">
      <div className="tooltip">
        <h4>7-DAY FORECAST</h4>
      </div>
      <div className="dailyForecast">
        {dayModules.map((mod) => (
          <DailyModule
            key={mod.date}
            weather={{
              ...mod,
              low: unit === "c" ? mod.low_c : mod.low_f,
              high: unit === "c" ? mod.high_c : mod.high_f,
              weekLow: unit === "c" ? mod.weekLow_c : mod.weekLow_f,
              weekHigh: unit === "c" ? mod.weekHigh_c : mod.weekHigh_f,
              temp: unit === "c" ? mod.temp_c : mod.temp_f,
            }}
          ></DailyModule>
        ))}
      </div>
    </div>
  );
}

DailyForecast.propTypes = {
  unit: PropTypes.string,
  searchTerm: PropTypes.string,
};

function DailyModule(props) {
  let weatherBarWidthPercent =
    (100 * (props.weather.high_c - props.weather.low_c)) /
    (props.weather.weekHigh_c - props.weather.weekLow_c);
  let weatherBarLeftPercent =
    (100 * (props.weather.low_c - props.weather.weekLow_c)) /
    (props.weather.weekHigh_c - props.weather.weekLow_c);
  let iconLeftPercent =
    (100 * (props.weather.temp_c - props.weather.weekLow_c)) /
    (props.weather.weekHigh_c - props.weather.weekLow_c);

  let weatherBarGradWidthPercent = 100 * 80 / (props.weather.high_c - props.weather.low_c);
  let weatherBarGradLeftPercent = -( ( props.weather.low_c + 40 ) / 10 ) * 100;
  console.log(weatherBarGradLeftPercent);
  return (
    <div className="dayModule">
      <h3>{props.weather.date}</h3>
      <div className="imgContainer">
        <img src={"http:" + props.weather.conditionSrc} alt={props.weather.condition} />
      </div>
      <div className="weatherBar">
        <h3>{Math.round(props.weather.low)}°</h3>
        <div className="weatherBarBG">
          <div
            className="weatherBarInner"
            style={{
              width: `${weatherBarWidthPercent}%`,
              left: `${weatherBarLeftPercent}%`,
            }}
          >
            <div className="weatherBarInnerGradient"
            style={{
              width: `${weatherBarGradWidthPercent}%`,
              left: `${weatherBarGradLeftPercent}%`,
            }}></div>
            {props.weather.date === "Today" ? (
              <div className="curTempIconContainer" style={{ left: `${iconLeftPercent}%` }}>
                <img src={circleImg} alt="" />
              </div>
            ) : (
              ""
            )}
          </div>
        </div>
        <h3>{Math.round(props.weather.high)}°</h3>
      </div>
    </div>
  );
}

DailyModule.defaultProps = {
  weather: {
    date: "Today",
    condition: "☁",
    conditionSrc: "",
    temp: 25,
    low: 14,
    high: 28,
    weekLow: 14,
    weekHigh: 30,
  },
};

DailyModule.propTypes = {
  weather: PropTypes.shape({
    date: PropTypes.string.isRequired,
    condition: PropTypes.string,
    conditionSrc: PropTypes.string,
    temp: PropTypes.number,
    low: PropTypes.number,
    high: PropTypes.number,
    weekLow: PropTypes.number,
    weekHigh: PropTypes.number,
    temp_c: PropTypes.number,
    low_c: PropTypes.number,
    high_c: PropTypes.number,
    weekLow_c: PropTypes.number,
    weekHigh_c: PropTypes.number,
  }),
};

function getDayName(dateStr, locale) {
  var date = new Date(dateStr + "T00:00:00");
  var str = date.toLocaleDateString(locale, { weekday: "short" });
  return str;
}

function CFButton({ unit, setUnit }) {
  let element = (
    <div className="toggleCF">
      <input onClick={onToggle} type="checkbox" id="switch" />
      <label htmlFor="switch">Toggle Celsius and Fahrenheit</label>
    </div>
  );

  function onToggle() {
    setUnit(unit === "c" ? "f" : "c");
  }
  return element;
}

CFButton.propTypes = {
  unit: PropTypes.string,
  setUnit: PropTypes.func,
  setSearchTerm: PropTypes.func,
};

function changeBG(code) {
  console.log(bgLookup[code]);
  document.querySelector("html").style.backgroundImage = bgLookup[code];
}

export default App;
