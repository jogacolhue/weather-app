import React, { Component } from "react";
import PropTypes from "prop-types";
import ForecastItem from "./WeatherLocation/ForecastItem";
import transformForecast from "../services/transformForecast";
import "./styles.css"; 

const api_key = "f99bbd9e4959b513e9bd0d7f7356b38d";
const url = "https://api.openweathermap.org/data/2.5/forecast";

export class ForecastExtended extends Component {
  constructor() {
    super();
    this.state = {
      forecastData: null
    };
  }

  componentDidMount() {
    this.updateCity(this.props.city);
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.city !== this.props.city) {
      this.setState({ forecastData: null });
      this.updateCity(this.props.city);
    }
  }

  updateCity = city => {
    const api_weather = `${url}?q=${city}&appid=${api_key}`;
    fetch(api_weather)
      .then(data => {
        return data.json();
      })
      .then(weather_data => {
        //console.log(weather_data);
        const forecastData = transformForecast(weather_data);
        //console.log(forecastData);
        this.setState({ forecastData });
      })
      .catch(err => this.setState({ error: err.message }));
  };

  renderForecastItemDays(forecastData) {
    return forecastData.map(forecast => (
      <ForecastItem
        key={`${forecast.weekDay}${forecast.hour}`}
        weekDay={forecast.weekDay}
        hour={forecast.hour}
        data={forecast.data}
      />
    ));
  }

  renderProgress() {
    return <h3>Cargando pronostico extendido...</h3>;
  }

  render() {
    const { city } = this.props;
    const { forecastData } = this.state;

    return (
      <div>
        <span />
        <h2 className="forecastTitle">Pronostico Extendido para {city}</h2>
        {forecastData
          ? this.renderForecastItemDays(forecastData)
          : this.renderProgress()}
      </div>
    );
  }
}

ForecastExtended.propTypes = {
  city: PropTypes.string.isRequired
};

export default ForecastExtended;
