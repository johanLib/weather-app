import React, { useState, useEffect } from 'react';
import WeatherInfo from './components/weatherInfo';
import InfoHumidity from './components/infoHumidity';
import InfoWind from './components/infoWind';

const APIKey = "1de8876972bd1a69dc3332b45c1c5bd3";

function WeatherApp() {
  const [city, setCity] = useState('');
  const [weatherData, setWeatherData] = useState(null);
  const [containerHeight, setContainerHeight] = useState(null);
  const [isVisible, setVisibility] = useState(false);
  const [error, setError] = useState(false);

  const handleSearch = () => {
    const inputCity = city.trim();
    if (!inputCity) return;

    setVisibility(false);
    fetchWeatherData(inputCity);
  };

  function getWeatherImage(weather) {
    switch (weather) {
      case "Clear":
        return "./clear.png";
      case "Rain":
        return "./rain.png";
      case "Snow":
        return "./snow.png";
      case "Clouds":
        return "./cloud.png";
      case "Mist":
        return "./mist.png";
      case "Haze":
        return "./haze.png";
      default:
        return "./cloud.png";
    }
  }

  const fetchWeatherData = (inputCity) => {
    fetch(`https://api.openweathermap.org/data/2.5/weather?q=${inputCity}&units=metric&appid=${APIKey}`)
      .then(response => response.json())
      .then(data => {
        if (data.cod === "404") {
          setError(true);
          setContainerHeight(400);
        } else {
          setWeatherData(data);
          setError(false);
          setContainerHeight(555);
        }
      })
      .catch(error => {
        console.error('Error fetching weather data:', error);
        setError(true);
        setContainerHeight(400);
      });
  };

  useEffect(() => {
    const timer = setTimeout(() => {
      setVisibility(true);
    }, 600);

    return () => clearTimeout(timer);
  }, [weatherData]);

  return (
    <main className="container" style={{ height: `${containerHeight}px` }}>
      <div className="container__search-box">
        <i className="bx bxs-map"></i>
        <input type="text" placeholder="enter your location" value={city} onChange={(e) => setCity(e.target.value)} />
        <button className="bx bx-search" onClick={handleSearch}></button>
      </div>
      <p className="city-hide">{city}</p>

      {error ? (
        <div className={`not-found ${isVisible ? '' : 'visible'}`}>
          <div className="box">
            <img src="./404.png" alt="404" />
            <p>Oops! Location not found!</p>
          </div>
        </div>
      ) : weatherData && (
        <>
        <div className="weather-box">
          <div className="box">
            <WeatherInfo visibility={isVisible} path={getWeatherImage(weatherData.weather[0].main)}
                         temp={parseInt(weatherData.main.temp)}
                         desc={weatherData.weather[0].description}/>
          </div>
        </div>
        <div className="weather-details">
          <div className="weather-details__humidity">
            <i className="bx bx-water"></i>
            <div className="text">
                <InfoHumidity visibility={isVisible} humidity={weatherData.main.humidity}/>
              <p>humidity</p>
            </div>
          </div>
          <div className="weather-details__wind">
            <i className="bx bx-wind"></i>
            <div className="text">
                <InfoWind visibility={isVisible} speed={parseInt(weatherData.wind.speed)}/>
              <p>Wind Speed</p>
            </div>
          </div>
        </div>
      </>
      )}
    </main>
  );
}

export default WeatherApp;
