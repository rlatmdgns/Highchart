import { LOAD_CHART_DATA, SET_SERIES, COLOR_CHANGE, Y_AXIS_CHANGE} from "../actions";

export const initalState = {
  chartData: [],
  dataSet: [],
  startDate: "",
  colorChangeDone: false,
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
        dataSet: state.dataSet.map((data) =>
          data.name === action.data.name ? { ...data, color: action.data.colorHexCode } : data
        ),
        colorChangeDone: true,
      };
    }
    case Y_AXIS_CHANGE: {
      return {
        ...state,
        dataSet: state.dataSet.map((data) =>
          data.name === action.data.name ? { ...data, yAxis: action.data.value } : data
        ),
      };
    }
    default:
      return state;
  }
};
export default reducer;
