import "./App.css";
import { useEffect, useState } from "react";
import Search from "./components/Search";
import * as React from "react";
import Dashboard from "./views/Dashboard";

export interface BookmarkSet {
  name: string;
  keybind: string;
  bookmarks: Bookmark[];
}

export interface Bookmark {
  displayName: string;
  url: string;
  keybind: string;
}

const storeKey = "BOOKMARK_SETS";
const loadBookmarkSetWidgets = () => {
  const emptyMap = new Map<string, BookmarkSet>();
  const ls = localStorage.getItem(storeKey);
  if (!ls) return emptyMap;

  try {
    const parsed = JSON.parse(ls);
    console.debug(
      "loadBookmarkSetWidgets: parsed",
      parsed,
      "from ls"
    );
    return emptyMap; // TODO return parsed map converted to map
  } catch (error) {
    return emptyMap;
  }
};

const App = () => {
  const [editMode, setEditMode] = useState(false);
  const [searchVisible, setSearchVisible] = useState(false);

  const [bookmarkSetWidgets, setBookmarkSetWidgets] = useState(
    loadBookmarkSetWidgets()
  );

  const saveBookmarkSetWidgets = (bmss: BookmarkSet[]) => {
    console.debug(
      "saveBookmarkSetWidgets: saving from App. array of new bookmarksets:",
      bmss
    );

    const bmswMap = new Map<string, BookmarkSet>();
    bmss.forEach((bms) => bmswMap.set(bms.name, bms));

    console.debug(
      "saveBookmarkSetWidgets: populated map from bookmarksets array:",
      bmswMap
    );

    setBookmarkSetWidgets(bmswMap);

    console.debug(
      "saveBookmarkSetWidgets: saved to state",
      bookmarkSetWidgets,
      "should equal",
      bmswMap
    );

    const stringifiedMap = JSON.stringify(bookmarkSetWidgets);

    console.debug(
      "saveBookmarkSetWidgets: saving stringified map to ls",
      stringifiedMap
    );

    localStorage.setItem(storeKey, stringifiedMap);
  };

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
          <Dashboard
            editMode={editMode}
            setEditMode={setEditMode}
            bookmarkSetWidgets={Array.from(
              bookmarkSetWidgets.values()
            )}
            saveBookmarkSetWidgets={saveBookmarkSetWidgets}
          />
        </>
      )}
    </div>
  );
};

export default App;
