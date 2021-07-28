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
});