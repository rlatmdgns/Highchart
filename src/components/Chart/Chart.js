import React, { useCallback, useEffect, useRef } from "react";
import * as Highcharts from "highcharts";
import HighchartsReact from "highcharts-react-official";
import { useDispatch, useSelector } from "react-redux";
import { setSeries } from "../../actions";
import ChartTable from "../ChartTable/ChartTable";
require("highcharts/modules/exporting")(Highcharts);
require("highcharts/modules/export-data")(Highcharts);
const Chart = () => {
  const { chartData, dataSet, startDate } = useSelector((state) => state.chart);
  const dispatch = useDispatch();
  const chart = useRef();

  const LabelData = (label) => {
    const LabelDataArr = chartData.map((data) => {
      return data[label];
    });
    return LabelDataArr;
  };
  const filterArr = (arr) => {
    const filterArr = arr.filter((item) => {
      return item !== "NaN" && item !== undefined && item !== "";
    });
    return filterArr;
  };
  const averageValue = (data) => {
    const arr = filterArr(data);
    if (arr.length > 0) {
      const value = arr.reduce((acc, cur) => acc + cur) / arr.length;
      return parseInt(value);
    }
  };
  const minValue = (arr) => {
    const value = Math.min.apply(null, filterArr(arr));
    return parseInt(value);
  };
  const maxValue = (arr) => {
    const value = Math.max.apply(null, filterArr(arr));
    return parseInt(value);
  };
  const deviationValue = (arr) => {
    const max = maxValue(arr);
    const min = minValue(arr);
    const result = max - min;
    return result;
  };

  useEffect(() => {
    const totalData = [
      {
        name: "BlackScr",
        yAxis: 0,
        data: LabelData("BlackScr"),
        color: "#000",
        average: averageValue(LabelData("BlackScr")),
        min: minValue(LabelData("BlackScr")),
        max: maxValue(LabelData("BlackScr")),
        deviation: deviationValue(LabelData("BlackScr")),
        visible: true,
      },
      {
        name: "EC_slab1",
        yAxis: 0,
        data: LabelData("EC_slab1"),
        color: "green",
        average: averageValue(LabelData("EC_slab1")),
        min: minValue(LabelData("EC_slab1")),
        max: maxValue(LabelData("EC_slab1")),
        deviation: deviationValue(LabelData("EC_slab1")),
        visible: true,
      },
      {
        name: "CO2air",
        yAxis: 1,
        data: LabelData("CO2air"),
        color: "blue",
        average: averageValue(LabelData("CO2air")),
        min: minValue(LabelData("CO2air")),
        max: maxValue(LabelData("CO2air")),
        deviation: deviationValue(LabelData("CO2air")),
        zoneAxis: "y",
        visible: true,
      },
      {
        name: "EC_drain_PC",
        yAxis: 0,
        data: LabelData("EC_drain_PC"),
        color: "yellow",
        average: averageValue(LabelData("EC_drain_PC")),
        min: minValue(LabelData("EC_drain_PC")),
        max: maxValue(LabelData("EC_drain_PC")),
        deviation: deviationValue(LabelData("EC_drain_PC")),
        visible: true,
      },
    ];
    dispatch(setSeries(totalData));
  }, [chartData]);

  const downloadCSV = useCallback(() => {
    if (chart && chart.current && chart.current.chart) {
      chart.current.chart.downloadCSV();
    }
  }, []);

  const options = {
    global: {
      timezoneOffset: 5 * 60,
    },
    chart: {
      type: "line",
      scrollablePlotArea: {
        minWidth: 600,
        scrollPositionX: 1,
      },
    },
    title: {
      text: "",
      align: "left",
    },
    subtitle: {
      text: "",
      align: "left",
    },
    xAxis: {
      type: "datetime",
      labels: {
        overflow: "justify",
      },
      crosshair: true,
    },
    yAxis: [
      {
        title: {
          text: "",
        },
      },
      {
        opposite: true,
      },
    ],
    legend: {
      enabled: false,
    },
    plotOptions: {
      series: {
        pointStart: Date.UTC(2010, 3, 2),
        pointInterval: 72000, // one day
      },
    },
    series: [...dataSet],
  };

  return (
    <div>
      <button type="button" onClick={downloadCSV}>
        CSV데이터 다운
      </button>
      <HighchartsReact ref={chart} highcharts={Highcharts} options={options} />
      <ChartTable
        series={dataSet}
        options={options}
      />
    </div>
  );
};

export default Chart;
