import { LOAD_CHART_DATA, SET_SERIES } from "../actions";

export const initalState = {
  chartData: [],
  series: [],
  startDate:""
};

const reducer = (state = initalState, action) => {
  switch (action.type) {
    case LOAD_CHART_DATA:
      return {
        ...state,
        chartData: action.data.dataset,
        startDate:action.data.dataset[0].time,
      };
    case SET_SERIES:
      return {
        ...state,
        series: action.data,
      };
    default:
      return state;
  }
};
export default reducer;
