import { useEffect, useState } from "react";
import "./App.css";
import { KanbanLayout } from "./components";
import DisplaySelector from "./components/DisplaySelector/DisplaySelector";
import { AppContext } from "./store/appStore";

function App() {
  const getInitialGrouping = () => {
    const grouping = localStorage.getItem("grouping");
    return grouping || "status";
  };

  const getInitialOrdering = () => {
    const ordering = localStorage.getItem("ordering");
    return ordering || "priority";
  };

  const [groupingState, setGroupingState] = useState(getInitialGrouping());
  const [orderingState, setOrderingState] = useState(getInitialOrdering());

  useEffect(() => {
    localStorage.setItem("grouping", groupingState);
  }, [groupingState]);

  useEffect(() => {
    localStorage.setItem("ordering", orderingState);
  }, [orderingState]);

  return (
    <AppContext.Provider
      value={{
        grouping: groupingState,
        setGrouping: setGroupingState,
        ordering: orderingState,
        setOrdering: setOrderingState,
      }}
    >
      <div className="App">
        <header className="header">
          <DisplaySelector />
        </header>
        <div className="kanban-layout-body">
          <KanbanLayout />
        </div>
      </div>
    </AppContext.Provider>
  );
}

export default App;
