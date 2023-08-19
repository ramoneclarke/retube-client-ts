import React from "react";
import SnippetSlider from "./SnippetSlider";

describe("<SnippetSlider />", () => {
  it("renders", () => {
    // see: https://on.cypress.io/mounting-react
    cy.viewport("macbook-15");
    cy.mount(<SnippetSlider />);
  });
});
