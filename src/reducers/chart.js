import { LOAD_CHART_DATA, SET_SERIES, COLOR_CHANGE } from "../actions";

export const initalState = {
  chartData: [],
  dataSet: [],
  startDate: "",
  colorChangeDone:false,
};

const reducer = (state = initalState, action) => {
  switch (action.type) {
    case LOAD_CHART_DATA:
      return {
        ...state,
        chartData: action.data.dataset,
        startDate: action.data.dataset[0].time,
      };
    case SET_SERIES:
      return {
        ...state,
        dataSet: action.data,
      };
    case COLOR_CHANGE: {
      return {
        ...state,
        dataSet: state.dataSet.map((data, index) =>
          index === action.data.index ? { ...data, color: action.data.colorHexCode } : data
        ),
        colorChangeDone:true,
      };
    }
    default:
      return state;
  }
};
export default reducer;
