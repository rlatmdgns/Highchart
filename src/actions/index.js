export const LOAD_CHART_DATA = "LOAD_CHART_DATA";
export const SET_SERIES = "SET_SERIES";

export const loadChartData = (data) => ({
  type:LOAD_CHART_DATA,
  data
})

export const setSeries = (data) => ({
  type:SET_SERIES,
  data
})