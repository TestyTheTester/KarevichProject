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

        //Opens PM
        cy.contains('MaksimSmilov00').click({force: true});

        //Waiting for page loads
        cy.get('[data-qa="message_pane"]').last().should('be.visible');

        //Waiting till the status will be Active
        cy.get('[data-qa="channel_name"] > i')
            .invoke('attr', 'title')
            .should('equal', 'Active');

        let textMessage = lorem.generateSentences(1);

        //Send Message
        cy.get('[aria-label="Send a message to MaksimSmilov00"]')
            .type(`${textMessage}{enter}`);


        //Get the last message time and write all information to the .json
        cy.get('[data-qa="slack_kit_scrollbar"]').last()
            .find('[data-qa="virtual-list-item"]').last()
            .find('.c-timestamp__label').then((time) => {
                const messageTime = time.text().trim();

                //Write text message to the .json
                cy.writeFile('menu.json', {user: 'MaksimSmilov11', message: textMessage, time: messageTime});
        });
    });
});
