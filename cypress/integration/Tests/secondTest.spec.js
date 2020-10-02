import { LoremIpsum } from "lorem-ipsum";

const lorem = new LoremIpsum({
    wordsPerSentence: { max: 5, min: 2 }
});

describe('Second User', () => {
    beforeEach(() => {
        cy.login('maksim.smilov11@gmail.com', 'qwe123QWE');

        //Clean up .json file
        cy.writeFile('menu.json', {user: ' ', message: ' '});
    });

    it('Second Account', () => {

        //Write text message to the .json
        let textMessage = lorem.generateSentences(1);
        cy.writeFile('menu.json', {user: 'MaksimSmilov11', message: textMessage});
        cy.log(`My message ${textMessage}`);
        console.log(`My message ${textMessage}`);

        //Opens Private Messages with User1
        cy.contains('MaksimSmilov00').click({force: true});

        //Waiting for page loads
        cy.get('[data-qa="message_pane"]').should('be.visible');
        cy.get('body').type('{esc}', {force: true});

        //Checks the status of User1
        cy.get('[data-qa="channel_name"] > i')
            .invoke('attr', 'title')
            .should('equal', 'Active').then(() => {

            //Send new message
            cy.get('[aria-label="Send a message to MaksimSmilov00"]')
                .type(`${textMessage}{enter}`);
        });
    });
});
