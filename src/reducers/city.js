import { SET_CITY } from "../actions/index";

export const city = (state = {}, action) => { 
  switch (action.type) {
    case SET_CITY:
      return action.payload; //{ ...state, city: action.payload };
    default:
      break;
  }

  return state;
};
