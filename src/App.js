import React, { Component } from "react";
import MuiThemeProvider from "@material-ui/core/styles/MuiThemeProvider";
import createMuiTheme from "@material-ui/core/styles/createMuiTheme";
import Grid from "@material-ui/core/Grid";
import Paper from "@material-ui/core/Paper";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import LocationListContainer from "./containers/LocationListContainer";
import ForecastExtendedContainer from "./containers/ForecastExtendedContainer";
import "./App.css";

const cities = ["Tacna,pe", "Lima,pe", "Puno,pe", "Moquegua,pe", "Santiago,cl"];
const theme = createMuiTheme();

export class App extends Component {
  render() {
    return (
      <MuiThemeProvider theme={theme}>
        <AppBar position="static" color="default">
          <Toolbar>
            <Typography variant="title" color="inherit">
              Weather App
            </Typography>
          </Toolbar>
        </AppBar>
        <div className="cuerpo">
          <Grid container>
            <Grid item xs={12} md={6}>
              <LocationListContainer cities={cities} />
            </Grid>
            <Grid item xs={12} md={6}>
              <Paper zdepth={4}>
                <div className="detail">
                  <ForecastExtendedContainer />
                </div>
              </Paper>
            </Grid>
          </Grid>
        </div>
      </MuiThemeProvider>
    );
  }
}

export default App;
