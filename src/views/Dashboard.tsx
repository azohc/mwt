import * as React from "react";
import "./Dashboard.css";
import TimeWidget from "../components/TimeWidget";
import { useState } from "react";

const Dashboard = () => {
  const [date, setDate] = useState(new Date());
  const [editMode, setEditMode] = useState(false);
  setInterval(() => setDate(new Date()), 1000);

  return (
    <div>
      <button
        className="edit-button"
        onClick={() => setEditMode(!editMode)}
      >
        {editMode ? "save" : "edit"}
      </button>
      <TimeWidget editable={editMode} date={date} />
    </div>
  );
};

export default Dashboard;
