import {useState,useEffect, useContext} from 'react';
import './main.css';
import SearchBar from './components/searchBar/SearchBar'
import Chart from './components/chart/Chart'
import Dashboard from './components/dashboard/Dashboard'
import ChartState from './context/chart/ChartState'
import ThemeContext from './context/theme/themeContext'


function App() {
  const themeContext = useContext(ThemeContext)
  const {darkTheme} = themeContext
  const storedDarkTheme = localStorage.getItem("DARK")

  useEffect(()=>{
    localStorage.setItem("DARK", darkTheme)
    themeContext.dispatch({ type: darkTheme });
  },[darkTheme])


  return (
    <div className="app" data-theme={darkTheme? "dark" : "light"}>
    
    <ChartState >
      <SearchBar />
      <Dashboard />
      <Chart/>
    </ChartState>
    </div>
  );
}

export default App;
