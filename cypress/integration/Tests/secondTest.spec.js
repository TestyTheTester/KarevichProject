import { LoremIpsum } from "lorem-ipsum";

const lorem = new LoremIpsum({
    wordsPerSentence: { max: 5, min: 2 }
});

describe('Slack Tests', () => {
    beforeEach(() => {
        cy.login('maksim.smilov11@gmail.com', 'qwe123QWE');

        //Clean up .json file
        cy.writeFile('menu.json', {user: ' ', message: ' ', time: ' '});

        //message to force slack to put the desired status
        cy.get(fields.generalInput).type(`Status updated{enter}`);
    });

    const fields = {
        generalInput: '[aria-label="Send a message to #general"]',
    };

    it('Second Account', () => {

        //Write text message to the .json
        let textMessage = lorem.generateSentences(1);
        cy.writeFile('menu.json', {user: 'MaksimSmilov11', message: textMessage});

        //Opens PM
        cy.contains('MaksimSmilov00').click({force: true});

        //Waiting for page loads
        cy.get('[data-qa="message_pane"]').should('be.visible');

        //Waiting till the status will be Active
        cy.get('[data-qa="channel_name"] > i')
            .invoke('attr', 'title')
            .should('equal', 'Active');

        //Send Message
        cy.get('[aria-label="Send a message to MaksimSmilov00"]')
            .type(`${textMessage}{enter}`);
    });
});
