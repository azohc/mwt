import * as React from "react";
import { useEffect, useRef } from "react";

const DUCKDUCKGO = "https://duckduckgo.com/?q=";
const GOOGLE = "https://google.com/search?&q=";
const YOUTUBE = "https://www.youtube.com/results?search_query=";
const I3 = "https://duckduckgo.com/?q=site:i3wm.org/docs ";
const TRANSLATE =
  "https://translate.google.com/#view=home&op=translate&sl=auto&tl=en&text= ";

const searchUrlByCode = new Map<string, string>([
  ["g", GOOGLE],
  ["d", DUCKDUCKGO],
  ["i", I3],
  ["t", TRANSLATE],
  ["y", YOUTUBE],
]);

const Search = () => {
  const searchField = useRef<HTMLInputElement>(null);
  useEffect(() => {
    searchField.current?.focus();
  }, []);

  const keyUp = ({ code }: React.KeyboardEvent) => {
    if (code === "Enter" && searchField.current) {
      const searchFieldValue = searchField.current.value;
      const preFirstSpace = searchFieldValue.split(" ")[0];

      if (searchUrlByCode.has(preFirstSpace)) {
        const url = searchUrlByCode.get(preFirstSpace);
        const query = searchFieldValue.substring(
          1,
          searchFieldValue.length
        );
        window.open(url + query, "_self");
      } else {
        window.open(DUCKDUCKGO + searchFieldValue, "_self");
      }
    }
  };

  return (
    <div className="search">
      <input
        ref={searchField}
        className="search-field"
        data-testid="search-field"
        type="text"
        onKeyUp={keyUp}
      />
    </div>
  );
};

export default Search;
