import React from "react";
import { BrowserRouter as Router } from "react-router-dom";
import ShortestPath from "./components/ShortestPath.tsx";

export default function App() {
  return (
    <Router>
      <ShortestPath />
    </Router>
  );
}
