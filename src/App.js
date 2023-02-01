import logo from "./logo.svg";
import "./App.css";
import { useEffect, useRef, useState } from "react";

function App() {
  const [searchVisible, setSearchVisible] = useState(false);
  const searchField = useRef();

  useEffect(() => {
    document.addEventListener("keyup", (event) => {
      if (event.code === "Space") {
        setSearchVisible(true);
        searchField.current.focus();
      }
    });
  }, []);

  function keyUp(e) {
    if (e.keyCode == 13) {
      const val = document
        .getElementById("search-field")
        .value.trim();
      const split = val.split(" ");
      if (split[0] == "g")
        window.open(
          "https://google.com/search?&q=" +
            val.substring(1, val.length),
          "_self"
        );
      else if (split[0] == "y")
        window.open(
          "https://www.youtube.com/results?search_query=" +
            val.substring(1, val.length),
          "_self"
        );
      else if (split[0] == "i")
        window.open(
          "https://duckduckgo.com/?q=site:i3wm.org/docs " +
            val.substring(1, val.length),
          "_self"
        );
      else if (split[0] == "t")
        window.open(
          "https://translate.google.com/#view=home&op=translate&sl=auto&tl=en&text= " +
            val.substring(1, val.length),
          "_self"
        );
      else window.open("https://duckduckgo.com/?q=" + val, "_self");
      document.getElementById("search-field").value = "";
      document.getElementById("search-field").blur();
      document.getElementById("search").style.display = "none";
    }
  }

  return (
    <div className="App">
      {searchVisible ? (
        <div className="search">
          <input
            ref={searchField}
            className="search-field"
            data-testid="search-field"
            type="text"
            onKeyUp={keyUp}
          />
        </div>
      ) : (
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
        </header>
      )}
    </div>
  );
}

export default App;
