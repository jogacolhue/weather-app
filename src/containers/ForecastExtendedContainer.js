import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import ForecastExtended from "../components/ForecastExtended";

export class ForecastExtendedContainer extends Component {
  static propTypes = {
    city: PropTypes.string.isRequired
  };

  render() {
    return this.props.city && <ForecastExtended city={this.props.city} />;
  }
}

const mapStateToProps = ({ city }) => ({ city });

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
