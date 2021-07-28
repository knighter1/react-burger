const { get } = require("http");

const constructorUrl = 'http://localhost:3000';

describe('burger constructor', function()
{
    it('one ingredient drag and drop', function()
    {
        cy.visit(constructorUrl);
        cy.get('[class^=IngredientMenuItem_menuItem__]').eq(2).trigger('dragstart');
        cy.get('[class^=BurgerConstructor_scrollableList__').trigger('drop');
        
        cy.get('[class^=IngredientsListItem_item__').should('have.length', 1);
    });

    it('bun ingredient drag and drop', function()
    {
        cy.visit(constructorUrl);
        cy.get('[class^=IngredientMenuItem_menuItem__').first().trigger('dragstart');
        cy.get('[class^=BurgerConstructor_scrollableList__').trigger('drop');
        
        cy.get('[class^=IngredientsListItem_item__').should('have.length', 2);
    });

    it('build burger', function()
    {
        cy.visit(constructorUrl);
        
        [1, 3, 5, 6, 8].forEach(index => {
            cy.get('[class^=IngredientMenuItem_menuItem__').eq(index).trigger('dragstart');
            cy.get('[class^=BurgerConstructor_scrollableList__').trigger('drop');
        });
        
        cy.get('[class^=IngredientsListItem_item__').should('have.length', 6);
        cy.get('[class^=BurgerConstructor_commitOrderWrapper__').contains('6132');
    });

    it('remove ingredient', function()
    {
        cy.visit(constructorUrl);

        [1, 3].forEach(index => {
            cy.get('[class^=IngredientMenuItem_menuItem__').eq(index).trigger('dragstart');
            cy.get('[class^=BurgerConstructor_scrollableList__').trigger('drop');
        });

        cy.get('[class^=IngredientsListItem_item__]').eq(1).find('.constructor-element__action').click();

        cy.get('[class^=IngredientsListItem_item__').should('have.length', 2);
    });

    it('reorder ingredients', function()
    {
        cy.visit(constructorUrl);

        [2, 3, 4].forEach((element, index) => {
            cy.get('[class^=IngredientMenuItem_menuItem__').eq(element).trigger('dragstart');
            cy.get('[class^=BurgerConstructor_scrollableList__').trigger('drop');
            
            cy.get('.constructor-element__text').eq(index).as(`item${index}`);
        });

        /*cy.get(`@item0`).trigger('dragstart');
        cy.get(`@item2`).trigger('drop');*/

        /*cy.get('[class^=IngredientsListItem_item__]').each(($element, index) => {
            cy.wrap($element).as(`newItem${index}`);
        });*/

        let item0, item1, item2;
        cy.get('.constructor-element__text').eq(0).and(elem => item0 = elem);
        cy.get('.constructor-element__text').eq(1).and(elem => item1 = elem);
        cy.get('.constructor-element__text').eq(2).and(elem => item2 = elem);

        let firstE;
        //cy.get('.constructor-element__text').eq(0).and(first => firstE = first);
        cy.get('.constructor-element__text').eq(0).and(second => expect(item0).to.equal(second));

        /*cy.get('@item2').and(first => firstE = first);
        cy.get('@newItem1').and(second => expect(firstE).to.equal(second));

        cy.get('@item0').and(first => firstE = first);
        cy.get('@newItem2').and(second => expect(firstE).to.equal(second));*/
    });
});