import React from "react";

export const AppContext = React.createContext({
  grouping: "",
  setGrouping: () => {},
  ordering: "",
  setOrdering: () => {},
});
