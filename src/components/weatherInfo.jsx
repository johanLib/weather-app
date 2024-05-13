import React from 'react';

export default function WeatherInfo(props) {
  
  return (
    <div className={`info-weather ${props.visibility ? 'visible' : ''}`}>
      <div className="weather">
        <img src={props.path} alt="" />
        <p className="temperature">{props.temp}<span>°C</span></p>
        <p className="decription">{props.desc}</p>
      </div>
    </div>
  );
}