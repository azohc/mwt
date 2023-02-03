import "./App.css";
import { useEffect, useState } from "react";
import Header from "./components/Header";
import Search from "./components/Search";

function App() {
  const [searchVisible, setSearchVisible] = useState(false);

  useEffect(() => {
    document.addEventListener("keyup", (event) => {
      if (event.code === "Space") {
        setSearchVisible(true);
      } else if (event.code === "Escape") {
        setSearchVisible(false);
      }
    });
  }, []);

  return (
    <div className="App">
      {searchVisible ? <Search /> : <Header />}
    </div>
  );
}

export default App;
