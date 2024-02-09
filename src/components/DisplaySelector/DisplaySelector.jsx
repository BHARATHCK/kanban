import { useContext, useEffect, useRef, useState } from "react";
import { VscSettings } from "react-icons/vsc";
import { IoChevronDown, IoChevronUp } from "react-icons/io5";
import "./DisplaySelector.css";
import { AppContext } from "../../store/appStore";

const DisplaySelector = () => {
  const [selectMode, setSelectMode] = useState(false);
  const { grouping, ordering, setGrouping, setOrdering } =
    useContext(AppContext);
  const selectorRef = useRef(null);
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (!selectorRef.current) return;
      if (selectorRef.current && !selectorRef.current.contains(event.target)) {
        setSelectMode(false);
      }
    };

    document.addEventListener("click", handleClickOutside);

    return () => {
      document.removeEventListener("click", handleClickOutside);
    };
  }, []);

  const onOrderingChange = (e) => {
    setOrdering(e.target.value);
    localStorage.setItem("ordering", e.target.value);
  };

  const onGroupingChange = (e) => {
    setGrouping(e.target.value);
    localStorage.setItem("grouping", e.target.value);
  };

  const handleSelection = () => {
    setSelectMode((prevSelectMode) => !prevSelectMode);
  };
  return (
    <div className="display-selector" ref={selectorRef}>
      <button className="selector-button" onClick={handleSelection}>
        <VscSettings />
        <p>Display</p>
        {selectMode ? <IoChevronDown color="black" /> : <IoChevronUp />}
      </button>
      {selectMode && (
        <div className="selection-card">
          <div className="selection-card-item">
            <p>Grouping</p>
            <select onChange={onGroupingChange} value={grouping}>
              <option value="status">Status</option>
              <option value="userid">UserId</option>
              <option value="priority">Priority</option>
            </select>
          </div>
          <div className="selection-card-item">
            <p>Ordering</p>
            <select onChange={onOrderingChange} value={ordering}>
              <option value="priority">Priority</option>
              <option value="title">Title</option>
            </select>
          </div>
        </div>
      )}
    </div>
  );
};

export default DisplaySelector;
