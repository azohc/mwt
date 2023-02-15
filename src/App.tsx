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

// TODO load / store bms
// const storeKey = "BOOKMARK_SETS_CONFIG";
// const load = () => {
//   const ls = localStorage.getItem(storeKey);
//   if (!ls) return initialOptions;

//   try {
//     return JSON.parse(ls);
//   } catch (error) {
//     return initialOptions;
//   }
// };

const App = () => {
  const [editMode, setEditMode] = useState(false);
  const [searchVisible, setSearchVisible] = useState(false);
  // TODO load from localstore
  const [bookmarkSetWidgets, setBookmarkSetWidgets] = useState(
    new Map<string, BookmarkSet>()
  );

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
            saveBookmarkSetWidgets={(bmss: BookmarkSet[]) => {
              setBookmarkSetWidgets(
                new Map<string, BookmarkSet>(
                  bmss.map((bms) => [bms.name, bms])
                )
              );
            }}
          />
        </>
      )}
    </div>
  );
};

export default App;
