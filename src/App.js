import './main.css';
import SearchBar from './components/searchBar/SearchBar'
import Chart from './components/chart/Chart'
import Dashboard from './components/dashboard/Dashboard'
import Footer from './components/footer/Footer'
import ChartState from './context/chart/ChartState'


function App() {
  return (
    <ChartState >
      <SearchBar />
      <Dashboard />
      <Chart/>
    </ChartState>
  );
}

export default App;
