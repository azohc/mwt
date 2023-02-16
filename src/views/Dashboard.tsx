import * as React from "react";
import "./Dashboard.css";
import TimeWidget from "../components/TimeWidget";
import { useState } from "react";
import DateWidget from "../components/DateWidget";
import BookmarkSetWidget from "../components/BookmarkSetWidget";
import { BookmarkSet } from "../App";

interface DashboardProps {
  editMode: boolean;
  setEditMode: (editmode: boolean) => void;
  bookmarkSetWidgets: BookmarkSet[];
  saveBookmarkSetWidgets: (bmss: BookmarkSet[]) => void;
}

const Dashboard = ({
  editMode,
  setEditMode,
  bookmarkSetWidgets,
  saveBookmarkSetWidgets,
}: DashboardProps) => {
  const [date, setDate] = useState(new Date());
  setInterval(() => setDate(new Date()), 1000);

  const handleBookmarkSetChange = (bms: BookmarkSet, i: number) => {
    console.debug(
      "handleBookmarkSetChange: handling bmset change from Dashboard",
      bookmarkSetWidgets,
      bms,
      i
    );
    console.debug(
      "handleBookmarkSetChange: changed bms:",
      bms,
      `(index ${i})`
    );

    const newBms = bookmarkSetWidgets.slice();
    newBms[i] = bms;

    console.debug(
      "handleBookmarkSetChange: saving new bmswidgets:",
      newBms
    );
    saveBookmarkSetWidgets(newBms);
  };

  return (
    <div className="dashboard-container">
      <div className="top-right-buttons">
        {editMode && (
          <button
            className="add-bmset-button"
            onClick={() =>
              saveBookmarkSetWidgets(
                bookmarkSetWidgets.concat({
                  name: "",
                  keybind: "",
                  bookmarks: [],
                })
              )
            }
          >
            add bookmarkset
          </button>
        )}
        <button
          className="edit-button"
          onClick={() => {
            setEditMode(!editMode);
          }}
        >
          {editMode ? "save" : "edit"}
        </button>
      </div>
      <DateWidget editable={editMode} date={date} />
      <TimeWidget editable={editMode} date={date} />
      <div className="bookmarksets">
        {bookmarkSetWidgets.map((bms, i) => (
          <BookmarkSetWidget
            key={bms.name}
            editable={editMode}
            bookmarkSet={bms}
            onBookmarkSetConfigChange={() =>
              handleBookmarkSetChange(bms, i)
            }
          />
        ))}
      </div>
    </div>
  );
};

export default Dashboard;
