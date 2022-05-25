import React from "react";
import ReactDOM from "react-dom";
import Tutorial from "./tutorial";

it("renders without crashing", () => {
  const div = document.createElement("div");
  ReactDOM.render(<Tutorial />, div);
});
