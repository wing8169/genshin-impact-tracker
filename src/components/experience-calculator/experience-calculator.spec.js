import React from "react";
import ReactDOM from "react-dom";
import { BrowserRouter } from "react-router-dom";
import ExperienceCalculator from "./experience-calculator";

it("renders without crashing", () => {
  const div = document.createElement("div");
  ReactDOM.render(
    <BrowserRouter>
      <ExperienceCalculator />
    </BrowserRouter>,
    div
  );
});
