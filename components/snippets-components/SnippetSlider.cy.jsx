import React from "react";
import SnippetSlider from "./SnippetSlider";
import { ColorModeProvider } from "@/context/ColorModeContext";

describe("<SnippetSlider />", () => {
  it("renders", () => {
    // see: https://on.cypress.io/mounting-react
    cy.mount(
      <ColorModeProvider value={{ darkMode: true }}>
        <SnippetSlider />
      </ColorModeProvider>
    );
  });
});
