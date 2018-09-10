import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { getForecastDataFromCities, getCity } from "../reducers";
import ForecastExtended from "../components/ForecastExtended";

export class ForecastExtendedContainer extends Component {
  static propTypes = {
    city: PropTypes.string.isRequired,
    forecastData: PropTypes.array
  };

  render() {
    const { city, forecastData } = this.props;
    return city && <ForecastExtended city={city} forecastData={forecastData} />;
  }
}

const mapStateToProps = (state) /*({ city, cities })*/ => ({
  city: getCity(state),
  forecastData: getForecastDataFromCities(state) //cities[city] && cities[city].forecastData
}); 

// const mapStateToProps = state => {
//   debugger;
//   return {
//     city: state.city
//   };
// };

export default connect(
  mapStateToProps,
  null
)(ForecastExtendedContainer);
