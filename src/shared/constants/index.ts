// ? Screens
export const SCREENS = {
  HOME: "Home",
  ADD: "Add",
  DETAIL: "Detail",
};

export const actionTypes = {
  SET_DATA: "SET_DATA",
  IS_LOADING: "IS_LOADING",
};

interface SET_DATA {
  type: "SET_DATA";
  payload: any;
}
interface IS_LOADING {
  type: "IS_LOADING";
  payload: any;
}

export type Action = SET_DATA | IS_LOADING;
