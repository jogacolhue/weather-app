import React, { Component } from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { setSelectedCity, setWeather } from "../actions";
import { getWeatherCities } from "../reducers";
import LocationList from "../components/LocationList";

export class LocationListContainer extends Component {
  componentDidMount = () => {
    this.props.setWeather(this.props.cities);
  };

  static propTypes = {
    setCity: PropTypes.func.isRequired,
    cities: PropTypes.array.isRequired
  };

  handleSelectedLocation = city => {
    //console.log(`handleSelectedLocation ${city}`);
    this.props.setCity(city);
  };

  render() {
    return (
      <LocationList
        cities={this.props.citiesWeather}
        onSelectedLocation={this.handleSelectedLocation}
      />
    );
  }
}

const mapDispatchToProps = dispatch => ({
  setCity: value => dispatch(setSelectedCity(value)),
  setWeather: cities => dispatch(setWeather(cities))
});

const mapStateToProps = state => {     
  return ({
    citiesWeather: getWeatherCities(state)
  });
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(LocationListContainer);
