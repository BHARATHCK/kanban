import { IoMdRadioButtonOff } from "react-icons/io";
import { TbProgress, TbUrgent } from "react-icons/tb";
import {
  MdOutlinePending,
  MdSignalCellularAlt2Bar,
  MdSignalCellularAlt,
} from "react-icons/md";
import { FaSignal, FaEllipsisH } from "react-icons/fa";
import { v4 as uuidv4 } from "uuid";

// Using mock api. since, quicksell's original API shared for assignment was not working after sometime.
export const KANBAN_API_URL =
  "https://mocki.io/v1/cdf820dd-d059-4530-a91e-061af1c6725f";
export const progressIconMap = {
  Todo: <IoMdRadioButtonOff color="gray" />,
  "In progress": <TbProgress color="orange" />,
  Backlog: <MdOutlinePending color="red" />,
  Urgent: <TbUrgent color="red" />,
  High: <FaSignal />,
  Low: <MdSignalCellularAlt2Bar />,
  "No Priority": <FaEllipsisH />,
  Medium: <MdSignalCellularAlt />,
};

export const priorityMap = {
  0: "No Priority",
  1: "Low",
  2: "Medium",
  3: "High",
  4: "Urgent",
};

export const groupTickets = (data, grouping) => {
  const { tickets, users } = data;
  const userMap = users.reduce((acc, user) => {
    acc[user.id] = {
      ...user,
      profileImageUrl: `https://i.pravatar.cc/30?${uuidv4()}`,
    };
    return acc;
  }, {});

  let groupedTickets = {};

  switch (grouping) {
    case "status":
      groupedTickets = tickets.reduce((acc, curr) => {
        if (acc.hasOwnProperty(curr.status)) {
          acc[curr.status].push({ ...curr, user: userMap[curr.userId] });
        } else {
          acc[curr.status] = [{ ...curr, user: userMap[curr.userId] }];
        }
        return acc;
      }, {});
      break;
    case "userid":
      groupedTickets = tickets.reduce((acc, curr) => {
        if (acc[userMap[curr.userId]?.name]) {
          acc[userMap[curr.userId]?.name].push({
            ...curr,
            user: userMap[curr.userId],
          });
        } else {
          acc[userMap[curr.userId]?.name] = [
            { ...curr, user: userMap[curr.userId] },
          ];
        }
        return acc;
      }, {});
      break;
    case "priority":
      groupedTickets = tickets.reduce((acc, curr) => {
        if (acc[priorityMap[curr.priority]]) {
          acc[priorityMap[curr.priority]].push({
            ...curr,
            user: userMap[curr.userId],
          });
        } else {
          acc[priorityMap[curr.priority]] = [
            { ...curr, user: userMap[curr.userId] },
          ];
        }
        return acc;
      }, {});
      break;
    default:
      break;
  }

  return groupedTickets;
};

export const sortGroupedTickets = (groupedTickets, ordering) => {
  Object.values(groupedTickets).forEach((group) => {
    if (ordering === "title") {
      group.sort((a, b) => a.title.localeCompare(b.title));
    } else if (ordering === "priority") {
      group.sort((a, b) => b.priority - a.priority);
    }
  });
  return groupedTickets;
};
