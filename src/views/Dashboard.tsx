import * as React from "react";
import "./Dashboard.css";
import TimeWidget from "../components/TimeWidget";
import DateWidget from "../components/DateWidget";
import BookmarkSetWidget from "../components/BookmarkSetWidget";
import { BookmarkSet } from "../App";

type DashboardControls = {
  editMode: boolean;
  setWidgetsState: React.Dispatch<
    React.SetStateAction<BookmarkSet[]>
  >;
};

type DashboardType = {
  bookmarkSetWidgets: BookmarkSet[];
};

type DashboardProps = DashboardControls & DashboardType;

const Dashboard = ({
  editMode,
  bookmarkSetWidgets,
  setWidgetsState,
}: DashboardProps) => {
  const [date, setDate] = React.useState(new Date());

  setInterval(() => setDate(new Date()), 1000);

  return (
    <div className="dashboard-container">
      <DateWidget editable={editMode} date={date} />
      <TimeWidget editable={editMode} date={date} />
      <div className="bookmarksets">
        {bookmarkSetWidgets.map((bms, i) => (
          <BookmarkSetWidget
            key={bms.id}
            id={bms.id}
            name={bms.name}
            keybind={bms.keybind}
            bookmarks={bms.bookmarks}
            editable={editMode}
            setWidgetState={(state) =>
              setWidgetsState([
                ...bookmarkSetWidgets.slice(0, i),
                state,
                ...bookmarkSetWidgets.slice(i + 1),
              ])
            }
          />
        ))}
      </div>
    </div>
  );
};

export default Dashboard;
