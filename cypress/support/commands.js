// ***********************************************
// This example commands.js shows you how to
// create various custom commands and overwrite
// existing commands.
//
// For more comprehensive examples of custom
// commands please read more here:
// https://on.cypress.io/custom-commands
// ***********************************************
//
//
// -- This is a parent command --
// Cypress.Commands.add('login', (email, password) => { ... })
//
//
// -- This is a child command --
// Cypress.Commands.add('drag', { prevSubject: 'element'}, (subject, options) => { ... })
//
//
// -- This is a dual command --
// Cypress.Commands.add('dismiss', { prevSubject: 'optional'}, (subject, options) => { ... })
//
//
// -- This will overwrite an existing command --
// Cypress.Commands.overwrite('visit', (originalFn, url, options) => { ... })

// Cypress.Commands.add("login", () => {
//   cy.intercept("/api/auth/session", { fixture: "session.json" }).as("session");

//   cy.visit("/")
//   // Set the cookie for cypress.
//   // It has to be a valid cookie so next-auth can decrypt it and confirm its validity.
//   cy.setCookie(
//     "next-auth.session-token",
//     "eyJhbGciOiJkaXIiLCJlbmMiOiJBMjU2R0NNIn0..iMXTosWVT-NAhNYR.ESqEHuR6hGzVycmWQiDg8cQE4TYOKSQcI1mYzC3wfAZHOSwOggT7pjhEQr0BVrUwIQ0UkUSKzfPx8BDgYon_k7QmYZUaItxrT9_30470t5BXpWt1MxlxTWRfqKoaX2S9BuAUFEoNb77ZW9pAyxVXRasN_t9q6oWciJx1bkCjer_TPCNJmotpSfn1T9U4OArKIzFEQomu2qkjza2_Gky5ZRLNtAtwHTaqThiyn6dTX27JuOVE6le5A9TWgxc4tPLg3Kwxy-JTjLzNiVaeMhVYAf2KCqtmB0BTydhF5_eXFdkwgysCKrqU-DVCavhrRxKvYljLofnPyODLietlkBptQHkBH_76rbtEIzwFtsVcMBdAMBbI7PpcC-ylBNXAEyIKndesJ39P--vnIJXTO2w0j_7V-QkrMvCntMiKJcYkKu-HhuXUQsFRkkZ01SNQSjz2XT5VD2lzEPfM3eAcy4pDC_1nZ22ZCu4XQw_dmcnxUijaqsQ7qzJ6ssH6JVzWfRaVKxdjDl3OWLcvDfJWFsXwZ4UY9Nar1XDiV4JGF2mixt1f8ZOnkRF3PDq9gqWGY-TBoMbMgDe51dZyXB2NboOxfeK771Vhj22YVQCvlcj6jZzjUr2N80ml6Vw17PDp_uud8oHyi5iHFIawika6X_S3QQZHEmbXjFqNIuIOnRmcnVS9Exs-oZQoTCJ_5INff4f92i1KpDEKPPiSv15kJDXtbW6k5iM6sMRAeSH5RhLzkj9RAk2PwEnMOoett0taYhGnLoSlcipLPZhJBfGYyZ5SwiUfx6E2ah23LlAaIxUIf8Ox55Mi-9i1WCt1i_o2a4W0Czn7t9c_hGsa3VoSG0j1p6miEWPUQWAFsefX4ceUD7hMF4Pi6RbAqMpdte5PGKTP3maCJUIWToFmu_Z2T2JAFo-aIHAxAn5q14pIk1hFpfq3H95LZpCdnx8q74rfTbHGmhuuLQdSOTcTanOPSSWVsR1liTomHuAooKzrPlHuXsHhxY_6DMsN11A3DliSoZhhgmd7cdnUuD2SXKNR0wDTFoRJ2EhYnh08lE8HZ-93xtGvU4XOp5MBQ9TyDTB3RUyJO_EYRvbolKJdZEeIiBTWQqvOLDCk6p62ryYZP5OVHC5wI3qHdhIZHB_gOA.MX2uWrxrJjTtK9dlhbhlLA"
//   );
//   cy.session("importantCookies", () => {
//     cy.setCookie(
//       "next-auth.session-token",
//       "eyJhbGciOiJkaXIiLCJlbmMiOiJBMjU2R0NNIn0..iMXTosWVT-NAhNYR.ESqEHuR6hGzVycmWQiDg8cQE4TYOKSQcI1mYzC3wfAZHOSwOggT7pjhEQr0BVrUwIQ0UkUSKzfPx8BDgYon_k7QmYZUaItxrT9_30470t5BXpWt1MxlxTWRfqKoaX2S9BuAUFEoNb77ZW9pAyxVXRasN_t9q6oWciJx1bkCjer_TPCNJmotpSfn1T9U4OArKIzFEQomu2qkjza2_Gky5ZRLNtAtwHTaqThiyn6dTX27JuOVE6le5A9TWgxc4tPLg3Kwxy-JTjLzNiVaeMhVYAf2KCqtmB0BTydhF5_eXFdkwgysCKrqU-DVCavhrRxKvYljLofnPyODLietlkBptQHkBH_76rbtEIzwFtsVcMBdAMBbI7PpcC-ylBNXAEyIKndesJ39P--vnIJXTO2w0j_7V-QkrMvCntMiKJcYkKu-HhuXUQsFRkkZ01SNQSjz2XT5VD2lzEPfM3eAcy4pDC_1nZ22ZCu4XQw_dmcnxUijaqsQ7qzJ6ssH6JVzWfRaVKxdjDl3OWLcvDfJWFsXwZ4UY9Nar1XDiV4JGF2mixt1f8ZOnkRF3PDq9gqWGY-TBoMbMgDe51dZyXB2NboOxfeK771Vhj22YVQCvlcj6jZzjUr2N80ml6Vw17PDp_uud8oHyi5iHFIawika6X_S3QQZHEmbXjFqNIuIOnRmcnVS9Exs-oZQoTCJ_5INff4f92i1KpDEKPPiSv15kJDXtbW6k5iM6sMRAeSH5RhLzkj9RAk2PwEnMOoett0taYhGnLoSlcipLPZhJBfGYyZ5SwiUfx6E2ah23LlAaIxUIf8Ox55Mi-9i1WCt1i_o2a4W0Czn7t9c_hGsa3VoSG0j1p6miEWPUQWAFsefX4ceUD7hMF4Pi6RbAqMpdte5PGKTP3maCJUIWToFmu_Z2T2JAFo-aIHAxAn5q14pIk1hFpfq3H95LZpCdnx8q74rfTbHGmhuuLQdSOTcTanOPSSWVsR1liTomHuAooKzrPlHuXsHhxY_6DMsN11A3DliSoZhhgmd7cdnUuD2SXKNR0wDTFoRJ2EhYnh08lE8HZ-93xtGvU4XOp5MBQ9TyDTB3RUyJO_EYRvbolKJdZEeIiBTWQqvOLDCk6p62ryYZP5OVHC5wI3qHdhIZHB_gOA.MX2uWrxrJjTtK9dlhbhlLA"
//     );
//   });
// });
