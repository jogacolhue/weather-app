import React, { Component } from "react";
import PropTypes from "prop-types";
import CircularProgress from "@material-ui/core/CircularProgress";
import Location from "./Location";
import WeatherData from "./WeatherData";
import transformWeather from "../../services/transformWeather";
import "./styles.css"; 

const api_key = "f99bbd9e4959b513e9bd0d7f7356b38d";
const url = "https://api.openweathermap.org/data/2.5/weather";

export class WeatherLocation extends Component {
  constructor({ city }) { 
    super();
    this.state = { 
      city, 
      data: null,
      error: null
    };
  }

  handleUpdateClick = () => {
    const { city } = this.state;
    const api_weather = `${url}?q=${city}&appid=${api_key}`;
    fetch(api_weather)
      .then(data => {
        return data.json();
      })
      .then(weather_data => {
        const data = transformWeather(weather_data);
        this.setState({ data: data }); 
      })
      .catch(err => this.setState({ error: err.message }));
  };

  componentWillMount() {
    this.handleUpdateClick(); 
  }

  render() {     
    const { onWeatherLocationClick } =  this.props;
    const { city, data, error } = this.state;
    return (
      <div className="weatherLocationCont" onClick={onWeatherLocationClick}>
        <Location city={city} />
        {data ? (
          <WeatherData data={data} />
        ) : !error ? (
          <CircularProgress thickness={7} />
        ) : (
          error
        )}
      </div>
    );
  }
}

WeatherLocation.propTypes = { 
  city: PropTypes.string.isRequired,
  onWeatherLocationClick: PropTypes.func
};

export default WeatherLocation;
