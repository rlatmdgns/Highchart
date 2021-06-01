export const LOAD_CHART_DATA = "LOAD_CHART_DATA";
export const SET_SERIES = "SET_SERIES";
export const COLOR_CHANGE = "COLOR_CHANGE";
export const Y_AXIS_CHANGE = "Y_AXIS_CHANGE";
export const ALL_CHECK_CHANGE = "ALL_CHECK_CHANGE";
export const CHECK_CHANGE = "CHECK_CHANGE";

export const loadChartData = (data) => ({
  type: LOAD_CHART_DATA,
  data,
});

export const setSeries = (data) => ({
  type: SET_SERIES,
  data,
});

export const colorChange = (data) => ({
  type: COLOR_CHANGE,
  data,
});

export const yAxisChange = (data) => ({
  type: Y_AXIS_CHANGE,
  data,
});

export const allCheckChange = (data) => ({
  type: ALL_CHECK_CHANGE,
  data,
});


export const checkChange = (data) => ({
  type: CHECK_CHANGE,
  data,
});

