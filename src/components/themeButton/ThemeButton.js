import React, { useContext } from "react";
import ThemeContext from "../../context/theme/themeContext";

export default function ThemeButton() {

    const themeContext = useContext(ThemeContext);
    const darkTheme = themeContext.state.darkTheme;

    const onClick = () => {
        if (darkTheme)
            themeContext.dispatch({ type: "LIGHT" });
        else
            themeContext.dispatch({ type: "DARK" });
    };
    return (
        <button className={`btn ${darkTheme ? "btn-dark" : "btn-light"}`} style={{borderLeft:0}} onClick={onClick}>
            {darkTheme ? <i style={{color:"#eae327"}} className="fas fa-moon"></i>: <i style={{color:"#f6bf3c"}} className="fas fa-sun"></i>}
        </button>
    )
}
