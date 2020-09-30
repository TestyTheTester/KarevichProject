import { LoremIpsum } from "lorem-ipsum";

const lorem = new LoremIpsum({
    wordsPerSentence: { max: 5, min: 2 }
});

describe('Slack Tests', () => {
    beforeEach(() => {
        cy.login('maksim.smilov11@gmail.com', 'qwe123QWE');
    });

    it('Second Account', () => {

        //Opens PM
        cy.contains('MaksimSmilov00').click();

        //Waiting for page loads
        cy.get('[data-qa="slack_kit_list"]').last().should('be.visible');

        //Waiting till the status will be Active
        cy.get('[data-qa="channel_name"] > i')
            .invoke('attr', 'title')
            .should('equal', 'Active');

        let textMessage = lorem.generateSentences(1);

        //Write text message
        cy.writeFile('menu.json', {user: 'MaksimSmilov11', message: textMessage});

        //Send Message
        cy.get('[aria-label="Send a message to MaksimSmilov00"]')
            .type(`${textMessage}{enter}`);
    });
});
