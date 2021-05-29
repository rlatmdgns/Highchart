import React from "react";
import { useEffect } from "react";
import { useDispatch } from 'react-redux';
import { loadChartData } from './actions';
// import chartData from "./chartData";
import HighCharts from "./components/Chart/Chart";
function App() {
  const dispatch = useDispatch()
  const getData = async () => {
    try {
      const response = await fetch("chartData.json");
      const data = await response.json();
      dispatch(loadChartData(data))
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    getData();
  }, []);

  
  return (
    <div className="App">
      <HighCharts />
    </div>
  );
}

export default App;
