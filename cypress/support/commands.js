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
// Cypress.Commands.add("login", (email, password) => { ... })
//
//
// -- This is a child command --
// Cypress.Commands.add("drag", { prevSubject: 'element'}, (subject, options) => { ... })
//
//
// -- This is a dual command --
// Cypress.Commands.add("dismiss", { prevSubject: 'optional'}, (subject, options) => { ... })
//
//
// -- This will overwrite an existing command --
// Cypress.Commands.overwrite("visit", (originalFn, url, options) => { ... })

import 'cypress-wait-until';

Cypress.Commands.add('routes', () => {
    cy.server();

    // cy.route('GET', '**/metrics/total**').as('getMetricsTotal');
    });

Cypress.Commands.add('login', (email, password) => {

    cy.routes();

    const loginForm = {
        email: '[data-qa="login_email"]',
        password: '[data-qa="login_password"]',
        signInButton: '[data-qa="signin_button"]',
    };

    //Visits the default URL
    cy.visit('/');

    //Checks URL and selects scenario
    let currentURL;
    cy.url().then(url => {
        currentURL = url;

        if(currentURL === 'https://slack.com/signin#/signin/') {

            //Clicks the button that will open custom workspace login page
            const signInManualButton = '[href="/workspace-signin"]';
            cy.get(signInManualButton).click();
        } else {

            //
            const continueButton = '[data-qa="submit_team_domain_button"]';
            cy.get('#domain').type('testythetesterltd');
            cy.get(continueButton).click();
        }
    });

    //
    const continueButton = '[data-qa="submit_team_domain_button"]';
    cy.get('#domain').type('testythetesterltd');
    cy.get(continueButton).click();

    cy.get(loginForm.email)
        .type(email);
    cy.get(loginForm.password)
        .type(password);
    cy.get(loginForm.signInButton).click();

    cy.url().should('include', 'slack.com');
});
