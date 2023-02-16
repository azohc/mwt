import * as React from "react";
import "./TopRightButtons.css";

interface TopRightButtonsProps {
  editMode: boolean;
  setEditMode: (editMode: boolean) => void;
  onAddBookmarkSet: () => void;
}
const TopRightButtons = ({
  editMode,
  setEditMode,
  onAddBookmarkSet,
}: TopRightButtonsProps) => {
  return (
    <div className="top-right-buttons">
      {editMode && (
        <button
          className="add-bmset-button"
          onClick={onAddBookmarkSet}
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
  );
};

export default TopRightButtons;
