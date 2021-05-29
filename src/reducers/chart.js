import { LOAD_CHART_DATA, SET_SERIES } from "../actions";

export const initalState = {
  chartData: [],
  series: [],
};

const reducer = (state = initalState, action) => {
  switch (action.type) {
    case LOAD_CHART_DATA:
      return {
        ...state,
        chartData: action.data.dataset,
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
