import React from "react";
import PropTypes from "prop-types";
import CircularProgress from "@material-ui/core/CircularProgress";
import Location from "./Location";
import WeatherData from "./WeatherData"; 
import "./styles.css";
 
const WeatherLocation = ({ onWeatherLocationClick, city, data, error }) => { 
  return <div className="weatherLocationCont" onClick={onWeatherLocationClick}>
    <Location city={city} />
    {data ? (
      <WeatherData data={data} />
    ) : !error ? (
      <CircularProgress thickness={7} />
    ) : (
      error
    )}
  </div>; 
};

WeatherLocation.propTypes = {
  city: PropTypes.string.isRequired,
  onWeatherLocationClick: PropTypes.func,
  data: PropTypes.shape({
    temperature: PropTypes.number.isRequired,
    weatherState: PropTypes.string.isRequired,
    humidity: PropTypes.number.isRequired,
    wind: PropTypes.string.isRequired
  }).isRequired
};

export default WeatherLocation;
