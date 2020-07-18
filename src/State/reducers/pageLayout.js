import uuid from "react-uuid";

import { produce } from "immer";

var initialState = {
  pageName: "sayfa2",
  pageLink: "",
  rows: [
    {
      rowID: uuid(),
      cols: [
        {
          colID: uuid(),
          componentID: "",
          componentName: "",
          classname: "bg-dark text-white",
          md: { span: 6, offset: 0 },
        },
        {
          colID: uuid(),
          componentID: "",
          componentName: "",
          classname: "bg-dark text-white",
          md: { span: 6, offset: 0 },
        },
      ],
    },
    {
      rowID: uuid(),
      cols: [],
    },
    {
      rowID: uuid(),
      cols: [],
    },
  ],
};

export function pageLayout(state = initialState, action) {
  switch (action.type) {
    case "GET_FROM_API":
      return produce(state, (draftstate) => {
        if (action.payload[0]) {
          draftstate.pageName = action.payload[0].pageName;
          draftstate.pageLink = action.payload[0].pageLink;
          draftstate.rows = action.payload[0].rows;
        }
      });

    case "ADD_ROW":
      return produce(state, (draftState) => {
        draftState.rows.push(action.payload);
      });

    case "DELETE_ROW":
      return produce(state, (draftState) => {
        draftState.rows.splice(
          draftState.rows.findIndex((X) => X.rowID === action.id),
          1
        );
      });

    case "ADD_COL":
      return produce(state, (draftState) => {
        draftState.rows[
          draftState.rows.findIndex((X) => X.rowID === action.id)
        ].cols.push({
          colID: uuid(),
          componentID: "",
          componentName: "",
          classname: "bg-dark text-white",
          md: { span: 12, offset: 0 },
        });
      });

    case "ATTACH_COMP_TO_COL":
      return produce(state, (draftState) => {
        var row = draftState.rows.findIndex(
          (X) => X.rowID === action.payload.rowID
        );

        draftState.rows[row].cols[
          draftState.rows[row].cols.findIndex(
            (X) => X.colID === action.payload.colID
          )
        ].componentID = action.payload.id;
      });

    case "DELETE_COL":
      return produce(state, (draftState) => {});

    default:
      return state;
  }
}
