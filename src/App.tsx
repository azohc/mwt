import "./App.css";
import { useEffect, useState } from "react";
import Header from "./components/Header";
import Search from "./components/Search";
import * as React from "react";

const App = () => {
  const [searchVisible, setSearchVisible] = useState(false);

  useEffect(() => {
    document.addEventListener("keyup", ({ code }) => {
      if (code === "Space") {
        setSearchVisible(true);
      } else if (code === "Escape") {
        setSearchVisible(false);
      }
    });
  }, []);

  return (
    <div className="App">
      {searchVisible ? <Search /> : <Header />}
    </div>
  );
};

export default App;
