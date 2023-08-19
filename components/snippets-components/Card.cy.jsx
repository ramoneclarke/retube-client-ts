import React from "react";
import Card from "./Card";

describe("<Card />", () => {
  it("renders", () => {
    // see: https://on.cypress.io/mounting-react
    cy.mount(
      <Card
        snippet={null}
        text="Test snippet"
        title="Test snippet video"
        videoId="v=KfSSplX2Lpk"
        setSelectedSnippetData={null}
        setSnippetWindowOpen={null}
      />
    );
  });

  it("card title should be displayed from the title prop", () => {
    // see: https://on.cypress.io/mounting-react
    cy.mount(
      <Card
        snippet={null}
        text="Test snippet"
        title="Test snippet video"
        videoId="v=KfSSplX2Lpk"
        setSelectedSnippetData={null}
        setSnippetWindowOpen={null}
      />
    );
    cy.get("[data-cy=card-title]").should("have.text", "Test snippet video");
  });

  it("card text should be displayed from the text prop", () => {
    // see: https://on.cypress.io/mounting-react
    cy.mount(
      <Card
        snippet={null}
        text="Test snippet"
        title="Test snippet video"
        videoId="v=KfSSplX2Lpk"
        setSelectedSnippetData={null}
        setSnippetWindowOpen={null}
      />
    );
    cy.get("[data-cy=card-text]").should("have.text", '"Test snippet"');
  });
});
