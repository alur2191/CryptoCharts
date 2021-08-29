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
        <button className={`btn ${darkTheme ? "btn-dark" : "btn-light"}`} onClick={onClick}>
            {darkTheme ? "Switch to Light Mode" : "Switch to Dark Mode"}
        </button>
    )
}
