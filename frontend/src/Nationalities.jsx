import React, { createContext, useEffect, useReducer } from 'react';
import axios from 'axios';

export const NationalitiesContext = createContext();

const initialState = {
  nationalities: [],
};

const nationalitiesReducer = (state, action) => {
  switch (action.type) {
    case 'SET_NATIONALITIES':
      return { ...state, nationalities: action.payload };
    default:
      return state;
  }
};

export const NationalitiesProvider = ({ children }) => {
  const [state, dispatch] = useReducer(nationalitiesReducer, initialState);

  useEffect(() => {
    const fetchNationalities = async () => {
      try {
        const response = await axios.get("https://restcountries.com/v3.1/all");
        const data = response.data;

        const extractedNationalities = data.map((country) => ({
          value: country.demonyms?.eng?.m || country.name.common,
          label: country.demonyms?.eng?.m || country.name.common,
        }));

        const uniqueNationalities = Array.from(
          new Map(extractedNationalities.map((item) => [item.value, item])).values()
        );

        dispatch({ type: 'SET_NATIONALITIES', payload: uniqueNationalities });
      } catch (err) {
        console.error("Error fetching nationalities:", err);
      }
    };

    fetchNationalities();
  }, []);

  return (
    <NationalitiesContext.Provider value={{ nationalities: state.nationalities }}>
      {children}
    </NationalitiesContext.Provider>
  );
};
