//data layer, provide for any component
import React, { createContext, useContext, useReducer } from 'react';

export const StateContext = createContext();

//higer order component
export const StateProvider = ({ reducer, initialState, children }) => (
    <StateContext.Provider value={useReducer(reducer, initialState)}>
        {children}
    </StateContext.Provider>
);

//pull information from data layer
export const useStateValue = () => useContext(StateContext);
