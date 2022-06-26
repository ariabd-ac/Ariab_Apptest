import { actionTypes, Action } from "../../shared/constants/index";

const initialState = {
  isLoading: false,
  data: [{}],
};

const contactReducer = (state: any = initialState, action: Action) => {
  switch (action.type) {
    case actionTypes.SET_DATA:
      return {
        ...state,
        data: action.payload,
        isLoading: true,
      };
    case actionTypes.IS_LOADING:
      return {
        ...state,
        isLoading: action.payload,
      };
    default:
      return state;
  }
};
export default contactReducer;
