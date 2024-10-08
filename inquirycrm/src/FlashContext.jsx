import React, { createContext, useReducer } from 'react';

// Create the FlashContext
export const FlashContext = createContext();

// Initial state with two fields: flashMessage and flashDescription
const initialState = {
    flashMessage: '',
    flashDescription: '',
};

// Reducer to handle setting flash message and description
const flashReducer = (state, action) => {
    switch (action.type) {
        case 'SET_FLASH':
            return { ...state, flashMessage: action.payload.message, flashDescription: action.payload.description };
        case 'CLEAR_FLASH':
            return { ...state, flashMessage: '', flashDescription: '' };
        default:
            return state;
    }
};

// FlashProvider component
export const FlashProvider = ({ children }) => {
    const [state, dispatch] = useReducer(flashReducer, initialState);

    // Function to set flash message and description
    const setFlash = (message, description) => {
        dispatch({ type: 'SET_FLASH', payload: { message, description } });
    };

    // Function to clear flash message and description
    const clearFlash = () => {
        dispatch({ type: 'CLEAR_FLASH' });
    };

    return (
        <FlashContext.Provider value={{
            flashMessage: {
                message: state.flashMessage,
                description: state.flashDescription
            }, setFlash, clearFlash
        }}>
            {children}
        </FlashContext.Provider>
    );
};
