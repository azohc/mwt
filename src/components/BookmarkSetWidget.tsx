import * as React from "react";
import { useId, useState } from "react";
import "./BookmarkSetWidget.css";
import { BookmarkSet } from "../App";
import TextInput from "./TextInput";

interface BookmarkSetWidgetProps {
  editable: boolean;
  bookmarkSet: BookmarkSet;
  onBookmarkSetConfigChange: (bms: BookmarkSet) => void;
}

const BookmarkSetWidget = ({
  editable,
  bookmarkSet,
  onBookmarkSetConfigChange,
}: BookmarkSetWidgetProps) => {
  const id = useId();
  const [name, setName] = useState(bookmarkSet.name || "");
  const [keybind, setKeybind] = useState(bookmarkSet.keybind || "");
  const [bookmarks] = useState(bookmarkSet.bookmarks || []);

  const saveBookmarksetConfig = () => {
    console.debug(
      "saveBookmarksetConfig: saving from BookmarkSetWidget"
    );

    onBookmarkSetConfigChange({
      name,
      keybind,
      bookmarks,
    });

    console.debug(
      "saveBookmarksetConfig: saved from BookmarkSetWidget"
    );
  };

  if (!editable) {
    return <h1 className="bmset-display">{bookmarkSet.name}</h1>;
  }
  return (
    <div className="bmset-editable-container">
      <div className="bmset-header">
        <TextInput
          classNames="bmset-name"
          id={id + "-name"}
          initialValue={name}
          label="name"
          maxLength={11}
          onValueChange={(newValue) => {
            setName(newValue);
            saveBookmarksetConfig();
          }}
        />
        <TextInput
          classNames="bmset-key"
          id={id + "-key"}
          initialValue={keybind}
          label="key"
          maxLength={1}
          onValueChange={(newValue) => {
            setKeybind(newValue);
            saveBookmarksetConfig();
          }}
        />
      </div>
    </div>
  );
};

export default BookmarkSetWidget;
