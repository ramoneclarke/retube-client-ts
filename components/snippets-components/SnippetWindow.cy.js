import React from "react";
import SnippetWindow from "./SnippetWindow";

describe("<SnippetWindow />", () => {
  it("renders", () => {
    cy.viewport("macbook-15");
    cy.mount(
      <SnippetWindow
        setSnippetWindowOpen={null}
        existingSnippetData={{
          id: 34,
          text: "It was like I, it was like just sports, opposing sports teams where I was like, I have a lot of respect for this person. I don't know anything about their character, but I'm gonna make up this story in my head to like motivate me. And the reason why I wanted to do that was because, so I launched, we technically launched the hustle in April, April, 2016. Were you before us or after us? We were 2015 when we launched the first newsletter, but it wasn't, it was a very small thing. So we were going like back and forth. It was like the skim was like the thing, and then it was you and.",
          video: {
            id: 10,
            title:
              "How To Grow A $75M Newsletter Business | Morning Brew Co-Founder (#398)",
            video_id: "gRxpcmMA548",
            url: "https://www.youtube.com/watch?v=gRxpcmMA548",
          },
          start: "208",
          end: "238",
          date_created: "2023-05-14T12:46:04.160052Z",
          owner: "rj",
        }}
        startTimeSeconds={0}
        endTimeSeconds={60}
      />
    );
  });
});
