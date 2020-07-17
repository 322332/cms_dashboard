import { produce } from "immer";

var initialState = [];

export function componentsInfo(state = initialState, action) {
  switch (action.type) {
    case "GET_COMPONENTS":
      return produce(state, (draftstate) => {
        draftstate.splice(0, draftstate.length);
        action.payload.map((item, id) => {
          // console.log(item);
          draftstate.push(item);
        });
      });

    default:
      return state;
  }
}
