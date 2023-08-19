import React from "react";
import NewSnippetWindow from "./NewSnippetWindow";

describe("<NewSnippetWindow />", () => {
  beforeEach(() => {
    cy.viewport("macbook-15");
    cy.mount(
      <NewSnippetWindow
        snippetWindowOpen={true}
        setSnippetWindowOpen={null}
        snippetMutation={{
          data: {
            id: 1,
            text: "Test snippet",
            video: {
              id: 4,
              title:
                "3 Patterns for Great Business Ideas with Jack Abraham, Founder, Managing Partner & CEO at Atomic",
              video_id: "YCq6RjGi-qA",
              url: "https://www.youtube.com/watch?v=YCq6RjGi-qA",
            },
            date_created: "2023-05-05T17:28:06.848795Z",
            owner: "test",
          },
          isLoading: false,
          isError: false,
          error: null,
          isIdle: false,
        }}
        startTimeSeconds={0}
        endTimeSeconds={60}
        maxUsage={false}
        setMaxUsage={null}
      />
    );
  });

  it("renders", () => {});

  it("video title should be displayed from the snippetMutation prop", () => {
    cy.get("[data-cy=snippet-window-video-title]").should(
      "contain",
      "3 Patterns for Great Business Ideas"
    );
  });

  it("times should be displayed from the time props", () => {
    cy.get("[data-cy=snippet-window-time]").should(
      "have.text",
      "00:00 - 01:00"
    );
  });

  it("url should be displayed from the snippetMutation prop", () => {
    cy.get("[data-cy=snippet-window-url]").should(
      "have.text",
      "https://www.youtube.com/watch?v=YCq6RjGi-qA"
    );
  });

  it("snippet should be displayed from the snippetMutation prop", () => {
    cy.get("[data-cy=snippet-window-snippet]").should(
      "have.text",
      "Test snippet"
    );
  });

  it("copy to clipboard button should be displayed", () => {
    cy.contains("[data-cy=clipboard-button]", "Copy Snippet");
  });
});
