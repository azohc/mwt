import * as React from "react";
import { useId, useState } from "react";
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
  bookmarks,
  editable,
  setWidgetState,
}: BookmarkSetWidgetProps) => {
  const state = { name, keybind, bookmarks };
  const id = useId();

  const [bookmarkInEditMode, setBookmarkInEditMode] = useState(NaN);
  const [bookmarkName, setBookmarkName] = useState("");
  const [bookmarkKeybind, setBookmarkKeybind] = useState("");
  const [bookmarkURL, setBookmarkURL] = useState("");

  if (!editable)
    return (
      <div className="bmset-container">
        <h1 className="bmset-display">{name}</h1>
        <div className="bmset-bookmark-container">
          {bookmarks.map((bm, i) => (
            <a className="bookmark" key={i} href={bm.url}>
              {bm.name}
            </a>
          ))}
        </div>
      </div>
    );

  // TODO click on a grid row to edit it, ok, but click on a particular cell to focus it after selecting the row for editing?

  return (
    <div className="bmset-editable-container">
      <div className="bmset-editable-header">
        <div className="ti-container bmset-name">
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
        <div className="ti-container bmset-key">
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
      <div className="bmgrid">
        <>
          <div className="bmgrid-header">name</div>
          <div className="bmgrid-header">url</div>
          <div className="bmgrid-header">key</div>
          <div className="bmgrid-header"></div>
          <div className="bmgrid-header"></div>
        </>
        {bookmarks.map((bm, i) => (
          <React.Fragment key={i}>
            <div className="bmgrid-cell">{bm.name}</div>
            <div className="bmgrid-cell url-cell">{bm.url}</div>
            <div className="bmgrid-cell">{bm.keybind}</div>
            <button
              disabled={bookmarkInEditMode === i}
              className="bmgrid-row-edit-btn"
              onClick={() => {
                setBookmarkInEditMode(i);
                setBookmarkName(bm.name);
                setBookmarkKeybind(bm.keybind);
                setBookmarkURL(bm.url);
              }}
            >
              edit
            </button>
            <button
              disabled={bookmarkInEditMode !== i}
              className="bmgrid-row-rm-btn"
              onClick={() => {
                setBookmarkInEditMode(NaN);
                setBookmarkName("");
                setBookmarkKeybind("");
                setBookmarkURL("");
                setWidgetState({
                  ...state,
                  bookmarks: [
                    ...bookmarks.splice(0, bookmarkInEditMode),
                    ...bookmarks.splice(bookmarkInEditMode + 1),
                  ],
                });
              }}
            >
              rm
            </button>
          </React.Fragment>
        ))}
      </div>
      <div className="bookmark-add-rm-buttons">
        <button
          onClick={() =>
            setWidgetState({
              ...state,
              bookmarks: bookmarks.concat({
                name: "",
                url: "",
                keybind: "",
              }),
            })
          }
        >
          add bookmark
        </button>
      </div>
      <div
        className={"edit-row-container".concat(
          isNaN(bookmarkInEditMode) ? " no-row-selected" : ""
        )}
      >
        <div className="edit-row-header">
          <div className="ti-container alt-bg bm-name">
            <label htmlFor={`${id}-bm-name`}>name</label>
            <input
              type="text"
              disabled={isNaN(bookmarkInEditMode)}
              value={bookmarkName}
              onChange={({ target }) => {
                setBookmarkName(target.value);
                const newBookmark = {
                  ...bookmarks[bookmarkInEditMode],
                  name: target.value,
                };
                setWidgetState({
                  ...state,
                  bookmarks: [
                    ...bookmarks.splice(0, bookmarkInEditMode),
                    newBookmark,
                    ...bookmarks.splice(bookmarkInEditMode + 1),
                  ],
                });
              }}
              placeholder={"bookmark name"}
              id={`${id}-bm-name`}
              maxLength={11}
              aria-describedby={`${id}-bm-name`}
              autoComplete="nope"
            />
          </div>
          <div className="ti-container alt-bg bm-key">
            <label htmlFor={`${id}-bm-key`}>key</label>
            <input
              type="text"
              disabled={isNaN(bookmarkInEditMode)}
              value={bookmarkKeybind}
              onChange={({ target }) => {
                setBookmarkKeybind(target.value);
                const newBookmark = {
                  ...bookmarks[bookmarkInEditMode],
                  keybind: target.value,
                };
                setWidgetState({
                  ...state,
                  bookmarks: [
                    ...bookmarks.splice(0, bookmarkInEditMode),
                    newBookmark,
                    ...bookmarks.splice(bookmarkInEditMode + 1),
                  ],
                });
              }}
              maxLength={1}
              id={`${id}-bm-key`}
              aria-describedby={`${id}-bm-key`}
              autoComplete="nope"
            />
          </div>
        </div>
        <div className="ti-container alt-bg bm-url">
          <label htmlFor={`${id}-bm-url`}>url</label>
          <input
            type="text"
            disabled={isNaN(bookmarkInEditMode)}
            value={bookmarkURL}
            onChange={({ target }) => {
              setBookmarkURL(target.value);
              const newBookmark = {
                ...bookmarks[bookmarkInEditMode],
                url: target.value,
              };
              setWidgetState({
                ...state,
                bookmarks: [
                  ...bookmarks.splice(0, bookmarkInEditMode),
                  newBookmark,
                  ...bookmarks.splice(bookmarkInEditMode + 1),
                ],
              });
            }}
            placeholder={"bookmark url"}
            id={`${id}-bm-url`}
            aria-describedby={`${id}-bm-url`}
            autoComplete="nope"
          />
        </div>
      </div>
    </div>
  );
};

export default BookmarkSetWidget;
