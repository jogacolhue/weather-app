import React, { Component } from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { setCity } from "../actions";
import  LocationList  from "../components/LocationList";

export class LocationListContainer extends Component {
  static propTypes = {
    setCity: PropTypes.func.isRequired,
    cities: PropTypes.array.isRequired,
  };

  handleSelectedLocation = city => {
    //console.log(`handleSelectedLocation ${city}`);
    this.props.setCity(city);
  };

  render() {
    return (
      <LocationList
        cities={this.props.cities}
        onSelectedLocation={this.handleSelectedLocation}
      />
    );
  }
}

const mapDispatchToProps = dispatch => ({
  setCity: value => dispatch(setCity(value))
});

export default connect(
  null,
  mapDispatchToProps
)(LocationListContainer);
