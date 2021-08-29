import React, { useReducer} from 'react';
import themeReducer from './themeReducer'
import ThemeContext from './themeContext'


// Provider component 
const ThemeState = ({children}) => {
    
    // Initial state
    const initialState = {
        darkTheme: false
    }

    const [state, dispatch] = useReducer(themeReducer, initialState);


    return  (<ThemeContext.Provider value={{
    state: state, dispatch: dispatch, darkTheme: state.darkTheme
    }}>
        {children}
    </ThemeContext.Provider>);
}


export default ThemeState;