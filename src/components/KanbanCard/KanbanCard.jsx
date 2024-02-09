import "./KanbanCard.css";
import { GoDotFill } from "react-icons/go";
import { progressIconMap } from "../../utils/utils";
import ProfileBadge from "../ProfileBadge/ProfileBadge";
import { useContext } from "react";
import { AppContext } from "../../store/appStore";

const KanbanCard = ({
  id,
  title,
  tag,
  status,
  priority,
  profileImageUrl,
  userStatus,
}) => {
  const { grouping } = useContext(AppContext);

  return (
    <div className="kanban-card">
      <div className="card-header">
        <div className="card-id">{id}</div>
        {grouping !== "userid" && (
          <ProfileBadge profileImageUrl={profileImageUrl} status={userStatus} />
        )}
      </div>
      <div className="card-title-item">
        {progressIconMap[status]} {title}
      </div>
      <div className="card-tags">
        {tag?.map((tagItem, index) => {
          return (
            <>
              <div className="card-tag">{progressIconMap[priority]}</div>
              <div className="card-tag" key={index}>
                <GoDotFill />
                <p>{tagItem}</p>
              </div>
            </>
          );
        })}
      </div>
    </div>
  );
};

export default KanbanCard;
