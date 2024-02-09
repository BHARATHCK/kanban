import "./KanbanLayout.css";
import { KanbanItemTitle, KanbanCard } from "../index";
import { useContext, useEffect, useState } from "react";
import { AppContext } from "../../store/appStore";
import {
  groupTickets,
  KANBAN_API_URL,
  priorityMap,
  sortGroupedTickets,
} from "../../utils/utils";

const fetchData = async () => {
  const res = await fetch(KANBAN_API_URL);
  const data = await res.json();
  return data;
};

const KanbanLayout = () => {
  const [data, setData] = useState({});
  const [sortedData, setSortedData] = useState({});
  const { grouping, ordering } = useContext(AppContext);

  useEffect(() => {
    fetchData()
      .then((res) => {
        setData(res);
      })
      .catch((err) => {
        console.log("Error fetching data :: ", err);
      });
  }, []);

  useEffect(() => {
    if (!data?.tickets) return;

    const sortedGroupedTickets = sortGroupedTickets(
      groupTickets(data, grouping),
      ordering
    );
    setSortedData(sortedGroupedTickets);
  }, [data, grouping, ordering]);

  return (
    <div className="kanban-layout">
      {Object.entries(sortedData)?.map(([key, value]) => {
        return (
          <div className="kanban-item" key={key}>
            <KanbanItemTitle
              status={key}
              count={value?.length}
              userImage={value[0]?.user?.profileImageUrl}
            />
            {value.map((kanbanItem) => {
              return (
                <KanbanCard
                  {...kanbanItem}
                  priority={priorityMap[kanbanItem.priority]}
                  key={kanbanItem.id}
                  profileImageUrl={kanbanItem.user?.profileImageUrl}
                  userStatus={kanbanItem.user?.available}
                />
              );
            })}
          </div>
        );
      })}
    </div>
  );
};

export default KanbanLayout;
