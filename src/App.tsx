import "./App.css";
import { useEffect, useState } from "react";
import Search from "./components/Search";
import * as React from "react";
import Dashboard from "./views/Dashboard";
import TopRightButtons from "./components/TopRightButtons";

export type BookmarkSet = {
  name: string;
  keybind: string;
  // bookmarks: Bookmark[];
};

const storeKey = "BOOKMARK_SETS";
const loadBookmarkSetWidgets = (): BookmarkSet[] => {
  const ls = localStorage.getItem(storeKey);
  if (!ls) return [];

  try {
    const parsed = JSON.parse(ls);
    return parsed;
  } catch (error) {
    return [];
  }
};

const App = () => {
  const [editMode, setEditMode] = useState(false);
  const [searchVisible, setSearchVisible] = useState(false);

  const [widgetsState, setWidgetsState] = useState<BookmarkSet[]>(
    loadBookmarkSetWidgets
  );

  useEffect(() => {
    const stringifiedMap = JSON.stringify(widgetsState);
    localStorage.setItem(storeKey, stringifiedMap);
  }, [widgetsState]);

  const handleKeyup = React.useCallback(
    ({ code }: { code: string }) => {
      if (code === "Space") {
        setSearchVisible(true);
      } else if (code === "Escape") {
        setSearchVisible(false);
      }
    },
    [setSearchVisible]
  );

  const handleAddBookmarkSet = () =>
    setWidgetsState(
      widgetsState.concat({
        name: "",
        keybind: "",
      })
    );

  useEffect(() => {
    if (!editMode) {
      document.addEventListener("keyup", handleKeyup);
    } else {
      document.removeEventListener("keyup", handleKeyup);
    }
  }, [editMode, handleKeyup]);

  return (
    <div className="App">
      {searchVisible ? (
        <Search />
      ) : (
        <>
          <TopRightButtons
            editMode={editMode}
            setEditMode={setEditMode}
            onAddBookmarkSet={handleAddBookmarkSet}
          />
          <Dashboard
            editMode={editMode}
            bookmarkSetWidgets={widgetsState}
            setWidgetsState={setWidgetsState}
          />
        </>
      )}
    </div>
  );
};

export default App;
