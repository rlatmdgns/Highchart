import React, { useEffect, useState } from "react";
import Highcharts from "highcharts";
import HighchartsReact from "highcharts-react-official";
import { useDispatch, useSelector } from "react-redux";
import { setSeries } from "../../actions";
const Chart = () => {
  const { chartData, series } = useSelector((state) => state.chart);
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
  const minValue = (arr) => {
    const minValue = Math.min.apply(null, filterArr(arr));
    return minValue;
  };
  const maxValue = (arr) => {
    const maxValue = Math.max.apply(null, filterArr(arr));
    return maxValue;
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
        max: minValue(LabelData("BlackScr")),
        min: maxValue(LabelData("BlackScr")),
        deviation: deviationValue(LabelData("BlackScr")),
      },
      {
        name: "EC_slab1",
        data: LabelData("EC_slab1"),
        color: "green",
        max: minValue(LabelData("EC_slab1")),
        min: maxValue(LabelData("EC_slab1")),
        deviation: deviationValue(LabelData("EC_slab1")),
      },
      {
        name: "CO2air",
        data: LabelData("CO2air"),
        color: "blue",
        max: minValue(LabelData("CO2air")),
        min: maxValue(LabelData("CO2air")),
        deviation: deviationValue(LabelData("CO2air")),
      },
      {
        name: "EC_drain_PC",
        data: LabelData("EC_drain_PC"),
        color: "yellow",
        max: minValue(LabelData("EC_drain_PC")),
        min: maxValue(LabelData("EC_drain_PC")),
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
      verticalAlign: 'bottom',
      y: 60,
      layout: 'vertical'
    },
    plotOptions: {
      spline: {
        lineWidth: 4,
        states: {
          hover: {
            lineWidth: 5,
          },
        },
        marker: {
          enabled: false,
        },
        pointInterval: 36000, // one hour
        pointStart: Date.UTC(2020, 3, 13, 0, 0, 0),
      },
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
      <button>aaa</button>
    </div>
  );
};

export default Chart;
