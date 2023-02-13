import "./App.css";
import { useEffect, useState } from "react";
import Search from "./components/Search";
import * as React from "react";
import Dashboard from "./views/Dashboard";

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
      {searchVisible ? <Search /> : <Dashboard />}
    </div>
  );
};

export default App;
