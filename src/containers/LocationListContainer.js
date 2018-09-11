import React, { Component } from "react";
import {bindActionCreators} from 'redux';
import { connect } from "react-redux";
import PropTypes from "prop-types";
import * as actions from "../actions";
import { getWeatherCities, getCity } from "../reducers";
import LocationList from "../components/LocationList"; 

export class LocationListContainer extends Component {
  componentDidMount = () => {
    const {setWeather, setSelectedCity, cities,city}=this.props;

    setWeather(cities);
    setSelectedCity(city); 
  };

  static propTypes = {
    setSelectedCity: PropTypes.func.isRequired,
    setWeather: PropTypes.func.isRequired,
    cities: PropTypes.array.isRequired,
    citiesWeather: PropTypes.array,
    city: PropTypes.string.isRequired,
  };

  handleSelectedLocation = city => {
    //console.log(`handleSelectedLocation ${city}`);
    this.props.setSelectedCity(city);
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

// const mapDispatchToProps = dispatch => ({
//   setSelectedCity: value => dispatch(setSelectedCity(value)),
//   setWeather: cities => dispatch(setWeather(cities))
// });

const mapDispatchToProps = dispatch => bindActionCreators(actions, dispatch);

const mapStateToProps = state => {     
  return ({
    citiesWeather: getWeatherCities(state),
    city: getCity(state), 
  });
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(LocationListContainer);
