import React from "react";
import UserIdentity from "./UserIdentity";
import { SessionProvider } from "next-auth/react";

describe("<UserIdentity />", () => {
  it("renders", () => {
    // see: https://on.cypress.io/mounting-react
    cy.mount(
      <SessionProvider>
        <UserIdentity />
      </SessionProvider>
    );
  });
});
