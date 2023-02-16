import * as React from "react";
import { useId } from "react";
import { BookmarkSet } from "../App";
import "./BookmarkSetWidget.css";

type BookmarkSetWidgetControls = {
  editable: boolean;
  setWidgetState: (bms: BookmarkSet) => void;
};

type BookmarkSetWidgetProps = BookmarkSet & BookmarkSetWidgetControls;

const BookmarkSetWidget = ({
  name,
  keybind,
  // bookmarks,
  editable,
  setWidgetState,
}: BookmarkSetWidgetProps) => {
  const state = { name, keybind };
  const id = useId();

  if (!editable) return <h1 className="bmset-display">{name}</h1>;

  return (
    <div className="bmset-editable-container">
      <div className="bmset-header">
        <div className={"ti-container bmset-name"}>
          <label htmlFor={`${id}-name`}>name</label>
          <input
            type="text"
            value={name}
            onChange={({ target }) =>
              setWidgetState({ ...state, name: target.value })
            }
            maxLength={11}
            placeholder={"bookmarkset"}
            id={`${id}-name`}
            aria-describedby={`${id}-name`}
            autoComplete="nope"
          />
        </div>
        <div className={"ti-container bmset-key"}>
          <label htmlFor={`${id}-key`}>key</label>
          <input
            type="text"
            value={keybind}
            onChange={({ target }) =>
              setWidgetState({ ...state, keybind: target.value })
            }
            maxLength={1}
            id={`${id}-key`}
            aria-describedby={`${id}-key`}
            autoComplete="nope"
          />
        </div>
      </div>
    </div>
  );
};

export default BookmarkSetWidget;
