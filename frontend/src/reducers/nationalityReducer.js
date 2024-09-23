// reducers/nationalityReducer.js

import { SET_NATIONALITIES } from "../actions/nationalityActions";

const initialState = {
  nationalities: [],
};

const nationalityReducer = (state = initialState, action) => {
  switch (action.type) {
    case SET_NATIONALITIES:
      return {
        ...state,
        nationalities: action.payload,
      };
    default:
      return state;
  }
};

export default nationalityReducer;
