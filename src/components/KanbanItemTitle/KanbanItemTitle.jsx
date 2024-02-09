import { IoMdAdd } from "react-icons/io";
import { FaEllipsisH } from "react-icons/fa";
import "./KanbanItemTitle.css";
import { progressIconMap } from "../../utils/utils";
import { useContext } from "react";
import { AppContext } from "../../store/appStore";

const KanbanItemTitle = ({ status, count, userImage }) => {
  const { grouping } = useContext(AppContext);

  return (
    <div className="layout-item-title">
      <div className="left-status-partition">
        {grouping === "userid" ? (
          <img src={userImage} className="profile-image" alt="profile image" />
        ) : (
          progressIconMap[status]
        )}
        <p>{status}</p>
        <p className="count">{count}</p>
      </div>
      <div className="right-actions-partition">
        <IoMdAdd color="gray" />
        <FaEllipsisH color="gray" />
      </div>
    </div>
  );
};

export default KanbanItemTitle;
