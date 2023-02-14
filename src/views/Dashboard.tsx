import * as React from "react";
import "./Dashboard.css";
import TimeWidget from "../components/TimeWidget";
import { useState } from "react";
import DateWidget from "../components/DateWidget";

const Dashboard = () => {
  const [date, setDate] = useState(new Date());
  const [editMode, setEditMode] = useState(false);
  setInterval(() => setDate(new Date()), 1000);

  return (
    <div className="dashboard-container">
      <button
        className="edit-button"
        onClick={() => setEditMode(!editMode)}
      >
        {editMode ? "save" : "edit"}
      </button>
      <DateWidget editable={editMode} date={date} />
      <TimeWidget editable={editMode} date={date} />
    </div>
  );
};

export default Dashboard;
