import { LoremIpsum } from "lorem-ipsum";

const lorem = new LoremIpsum({
    wordsPerSentence: { max: 5, min: 2 }
});

describe('Slack Tests', () => {
    beforeEach(() => {
        cy.login('maksim.smilov00@gmail.com', 'qwe123QWE');
    });

    //Variables
    const buttons = {
        userProfileButton: '[data-qa="user-button"]',
    };
    const fields = {
        generalInput: '[aria-label="Send a message to #general"]',
    };

    it('First Account', () => {

        //Waiting for page loads
        cy.get('[data-qa="slack_kit_list"]').last().should('be.visible');

        //message to force slack to put the desired status
        cy.get(fields.generalInput).type(`Status updated{enter}`);

        //Checks User Status and set to Active
        const userActiveStatus = '[data-qa="user-button"] > div > i';
        cy.get(userActiveStatus).invoke('attr', 'title').then(userTitle => {
                const title = userTitle;
                cy.log(`Current Status = ${title}`);

                //Opens user profile dropdown
                cy.get(buttons.userProfileButton).should('be.visible').click();

                //Change status. If Away = set Active. If Active = nothing.
                if(title === 'Away') {

                    //Set status = Active
                    cy.get('[data-qa="menu_items"]').should('be.visible')
                        .find('[data-qa="menu_item_button"]')
                        .eq(0).click();
                    cy.log('Your status is changed to Active');

                } else {
                    cy.log('Your status is Active');
                }
        });

        //Waiting for new message > opens chat after get new message
        const newMessageBadge = '[data-qa="mention_badge"]';
        cy.get(newMessageBadge).should('be.visible').click({force: true});

        //Waiting for loading a message list and get last message
        cy.get('[data-qa="slack_kit_scrollbar"]').last()
            .find('[data-qa="virtual-list-item"]').last()
            .find('[data-qa="message_content"] .p-rich_text_section').then((textMessage) => {
            const newMessage = textMessage.text().trim();
            cy.log(newMessage);

            //Check than message is correct
            cy.readFile('menu.json').then((message) => {
                expect(message.message).to.include(newMessage);
            });
        });

        //Send Message
        cy.get('[aria-label="Send a message to MaksimSmilov11"]')
            .type(`${lorem.generateSentences(1)}{enter}`);
    });
});
