import { produce } from "immer";

var initialState = {
  selectedPage: "",
};
export function app(state = initialState, action) {
  switch (action.type) {
    case "SET_SELECTEDPAGE":
      return Object.assign({}, state, {
        selectedPage: action.selectedPage,
      });

    default:
      return state;
  }
}
