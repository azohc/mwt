import { useEffect, useRef } from "react";

const Search = () => {
  const searchField = useRef();
  useEffect(() => {
    searchField.current?.focus();
  }, []);

  function keyUp(event) {
    if (event.code === "Enter") {
      const searchFieldValue = searchField.current.value;
      const preFirstSpace = searchFieldValue.split(" ")[0];

      const DUCKDUCKGO = "https://duckduckgo.com/?q=";
      const GOOGLE = "https://google.com/search?&q=";
      const YOUTUBE = "https://www.youtube.com/results?search_query=";
      const I3 = "https://duckduckgo.com/?q=site:i3wm.org/docs ";
      const TRANSLATE =
        "https://translate.google.com/#view=home&op=translate&sl=auto&tl=en&text= ";

      const searchUrlByCode = {
        g: GOOGLE,
        d: DUCKDUCKGO,
        i: I3,
        t: TRANSLATE,
        y: YOUTUBE,
      };

      if (searchUrlByCode[preFirstSpace]) {
        const url = searchUrlByCode[preFirstSpace];
        const query = searchFieldValue.substring(
          1,
          searchFieldValue.length
        );
        window.open(url + query, "_self");
      } else {
        window.open(DUCKDUCKGO + searchFieldValue, "_self");
      }
    }
  }

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
