export const LOAD_CHART_DATA = "LOAD_CHART_DATA";
export const SET_SERIES = "SET_SERIES";
export const COLOR_CHANGE = "COLOR_CHANGE";

export const loadChartData = (data) => ({
  type:LOAD_CHART_DATA,
  data
})

export const setSeries = (data) => ({
  type:SET_SERIES,
  data
})


export const colorChange = (data) => ({
  type:COLOR_CHANGE,
  data
})
