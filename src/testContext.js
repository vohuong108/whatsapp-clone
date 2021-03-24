import { createContext, useContext } from 'react';

export const StateContext = createContext();

//pull information from data layer
export const useStateValue = () => useContext(StateContext);