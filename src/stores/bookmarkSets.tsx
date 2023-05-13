import { create } from "zustand";
import {
  createJSONStorage,
  devtools,
  persist,
} from "zustand/middleware";
import { Bookmark, BookmarkSet } from "../App";

interface BookmarkSetsState {
  widgets: BookmarkSet[];
  add: (widget: BookmarkSet) => void;
  addBookmark: (id: string, bookmark: Bookmark) => void;
  updateBookmark: (id: string, bookmark: Bookmark) => void;
}

export const useBookmarkSets = create<BookmarkSetsState>()(
  devtools(
    persist(
      (set) => ({
        widgets: [],
        add: (widget) =>
          set((state) => ({ widgets: [...state.widgets, widget] })),
        addBookmark: (id, bookmark) => {
          // TODO IMPLEMENT
        },
        updateBookmark: (id, bookmark) => {
          // TODO IMPLEMENT
        },
      }),
      {
        name: "bookmark-set-storage",
        storage: createJSONStorage(() => localStorage),
      }
    )
  )
);
