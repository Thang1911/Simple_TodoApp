import React, { useRef } from "react";
import "./App.css";
import Lists from "./components/Lists";
import Add from "./components/Add";

function App() {
  return (
    <div>
      <Add />
      <Lists />
    </div>
  );
}

export default App;
