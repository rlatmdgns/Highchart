import React, { useEffect, useState } from "react";
import Highcharts from "highcharts";
import HighchartsReact from "highcharts-react-official";
import { useDispatch, useSelector } from "react-redux";
import { setSeries } from "../../actions";
import ChartTable from "../ChartTable/ChartTable";
const Chart = () => {
  const { chartData, dataSet, startDate } = useSelector((state) => state.chart);
  const dispatch = useDispatch();
  const [checkItems, setCheckItems] = useState([]);

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

  const options = {
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
      enabled: false,
    },
    plotOptions: {
      series: {
        pointStart: Date.UTC(2010, 3, 2),
        pointInterval: 48000, // one day
        events: {
          hide: function (e) {
            handleSingleCheck(e.target.visible, e.target.index, options);
          },
          show: function (e) {
            handleSingleCheck(e.target.visible, e.target.index, options);
          },
        },
      },
    },
    series: [...dataSet],
  };
  const handleSingleCheck = (checked, id, options) => {
    if (checked) {
      setCheckItems([...checkItems, id]);
      options.series[id].visible = true;
    } else {
      // 체크 해제
      options.series[id].visible = false;
      setCheckItems(checkItems.filter((el) => el !== id));
    }
  };
  // 체크박스 전체 선택
  const handleAllCheck = (checked) => {
    if (checked) {
      const idArray = [];
      // 전체 체크 박스가 체크 되면 id를 가진 모든 elements를 배열에 넣어주어서,
      // 전체 체크 박스 체크
      dataSet.map((el, i) => {
        idArray.push(i);
        options.series[i].visible = true;
      });
      setCheckItems(idArray);
    }
    // 반대의 경우 전체 체크 박스 체크 삭제
    else {
      setCheckItems([]);
      dataSet.map((el, i) => {
        options.series[i].visible = false;
      });
    }
  };

  useEffect(() => {
    const totalData = [
      {
        name: "BlackScr",
        data: LabelData("BlackScr"),
        color: "#000",
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
    let ids = [];
    dataSet.map((v, i) => (ids[i] = i));
    setCheckItems(ids);
  }, [chartData]);
  return (
    <div>
      <HighchartsReact highcharts={Highcharts} options={options} />
      <ChartTable
        series={dataSet}
        handleSingleCheck={handleSingleCheck}
        handleAllCheck={handleAllCheck}
        checkItems={checkItems}
        options={options}
      />
    </div>
  );
};

export default Chart;
