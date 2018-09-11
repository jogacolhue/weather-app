import transformForecast from "../services/transformForecast";
import transformWeather from "../services/transformWeather";

export const SET_CITY = "SET_CITY";
export const SET_FORECAST_DATA = "SET_FORECAST_DATA";

export const GET_WEATHER_CITY = "GET_WEATHER_CITY";
export const SET_WEATHER_CITY = "SET_WEATHER_CITY";
export const SET_WEATHER_CITY_ERROR = "SET_WEATHER_CITY_ERROR";

const setCity = payload => ({ type: SET_CITY, payload });
const setForecastData = payload => ({ type: SET_FORECAST_DATA, payload });

const getWeatherCity = payload => { 
  return { type: GET_WEATHER_CITY, payload };
};
const setWeatherCity = payload => ({ type: SET_WEATHER_CITY, payload });
const setWeatherCityError = payload => ({
  type: SET_WEATHER_CITY_ERROR,
  payload
});

const api_key = "f99bbd9e4959b513e9bd0d7f7356b38d";
const url = "https://api.openweathermap.org/data/2.5/forecast";

const urlWeather = "https://api.openweathermap.org/data/2.5/weather";

export const setSelectedCity = payload => {
  return (dispatch, getState) => {
    const api_weather = `${url}?q=${payload}&appid=${api_key}`;

    // activar en el estado un indicador de búsqueda de datos
    dispatch(setCity(payload));

    const state = getState(); 
    const date = state.cities[payload] &&  state.cities[payload].forecastDataDate;

    const now  = new Date();

    if (date && (now-date) < 1 * 60 *1000 ){
      return;
    }

    return fetch(api_weather)
      .then(data => {
        return data.json();
      })
      .then(weather_data => {
        const forecastData = transformForecast(weather_data);
        //console.log(forecastData);

        // modificar el estado con el resultado de la promise
        dispatch(setForecastData({ city: payload, forecastData }));
      })
      .catch(err => this.setState({ error: err.message }));
  };
};

export const setWeather = payload => {
  return dispatch => {
    payload.forEach(city => { 
      dispatch(getWeatherCity(city));

      const api_weather = `${urlWeather}?q=${city}&appid=${api_key}`;
      fetch(api_weather)
        .then(data => {
          return data.json();
        })
        .then(weather_data => {
          const weather = transformWeather(weather_data);
          dispatch(setWeatherCity({ city, weather }));
        })
        .catch(err => { 
          const error = err.message;
          dispatch(setWeatherCityError({ city, error }));
        });
    });
  };
};
