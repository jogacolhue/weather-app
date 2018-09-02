import React from "react";
import PropTypes from "prop-types";
import WeatherLocation from "./WeatherLocation";
import './styles.css';

const LocationList = ({ cities, onSelectedLocation }) => {
  const handleWeatherLocation = city => {
    //console.log("handleWeatherLocation");
    onSelectedLocation(city);
  };

  const stringToComponent = cities => {
    return cities.map(city => (
      <WeatherLocation
        key={city}
        city={city} 
        onWeatherLocationClick={() => handleWeatherLocation(city)}
      />
    ));
  };

  return <div className="locationList">{stringToComponent(cities)}</div>;
};

LocationList.propTypes = {
  cities: PropTypes.array.isRequired,
  onSelectedLocation: PropTypes.func
};

export default LocationList;
