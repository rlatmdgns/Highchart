import React, { useEffect, useState } from "react";
import Highcharts from "highcharts";
import HighchartsReact from "highcharts-react-official";
import { useDispatch, useSelector } from "react-redux";
import { setSeries } from "../../actions";
import ChartTable from "../chartTable/ChartTable";
const Chart = () => {
  const { chartData, series, startDate } = useSelector((state) => state.chart);
  const dispatch = useDispatch();
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
    console.log(arr, "Asdsads");
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
        data: LabelData("BlackScr"),
        color: "red",
        average: averageValue(LabelData("BlackScr")),
        min: minValue(LabelData("BlackScr")),
        max: maxValue(LabelData("BlackScr")),
        deviation: deviationValue(LabelData("BlackScr")),
      },
      {
        name: "EC_slab1",
        data: LabelData("EC_slab1"),
        color: "green",
        average: averageValue(LabelData("EC_slab1")),
        min: minValue(LabelData("EC_slab1")),
        max: maxValue(LabelData("EC_slab1")),
        deviation: deviationValue(LabelData("EC_slab1")),
      },
      {
        name: "CO2air",
        data: LabelData("CO2air"),
        color: "blue",
        average: averageValue(LabelData("CO2air")),
        min: minValue(LabelData("CO2air")),
        max: maxValue(LabelData("CO2air")),
        deviation: deviationValue(LabelData("CO2air")),
      },
      {
        name: "EC_drain_PC",
        data: LabelData("EC_drain_PC"),
        color: "yellow",
        average: averageValue(LabelData("EC_drain_PC")),
        min: minValue(LabelData("EC_drain_PC")),
        max: maxValue(LabelData("EC_drain_PC")),
        deviation: deviationValue(LabelData("EC_drain_PC")),
      },
    ];
    dispatch(setSeries(totalData));
  }, [chartData]);
  const options = {
    lang: {
      months: ["1월", "2월", "3월", "4월", "5월", "6월", "7월", "8월", "9월", "10월", "11월", "12월"],
    },
    global: {
      timezoneOffset: 5 * 60,
    },
    chart: {
      type: "spline",
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
    },
    yAxis: {
      title: {
        text: "",
      },
    },
    legend: {
      enabled: true,
      useHTML: true,
      verticalAlign: "bottom",
      y: 60,
      layout: "vertical",
    },
    plotOptions: {
      series: {
        pointStart: Date.UTC(2010, 3, 2),
        pointInterval: 24 * 3600 * 1000 // one day
    }
    },
    // xAxis: {
    //   type: "datetime",
    //   labels: {
    //     format: '{value:%H}'
    //   },
    // },
    series,
  };
  return (
    <div>
      <HighchartsReact highcharts={Highcharts} options={options} />
      <ChartTable series={series} />
    </div>
  );
};

export default Chart;
git 