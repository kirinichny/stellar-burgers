/// <reference types="cypress" />
import { SELECTORS, TEXT } from '../support/constants';

describe('Burger constructor functionality', () => {
  beforeEach(() => {
    cy.intercept('GET', 'api/ingredients', { fixture: 'ingredients.json' });
    cy.viewport(1500, 800);
    cy.visit('/');
  });

  describe('Adding ingredients to constructor', () => {
    it('should add a bun to the constructor', () => {
      cy.get(SELECTORS.bunsIngredientsSection).contains(TEXT.addButton).click();
      cy.get(SELECTORS.constructorBunTop)
        .contains('Краторная булка N-200i')
        .should('exist');

      cy.get(SELECTORS.constructorBunBottom)
        .contains('Краторная булка N-200i')
        .should('exist');
    });

    it('should add main and sauce ingredients to the constructor', () => {
      cy.get(SELECTORS.mainIngredientsSection).contains(TEXT.addButton).click();
      cy.get(SELECTORS.sauceIngredientsSection)
        .contains(TEXT.addButton)
        .click();
      cy.get(SELECTORS.constructorIngredientsArea)
        .contains('Биокотлета из марсианской Магнолии')
        .should('exist');
      cy.get(SELECTORS.constructorIngredientsArea)
        .contains('Соус Spicy-X')
        .should('exist');
    });
  });

  describe('Ingredient modal window', () => {
    it('should open ingredient modal when ingredient is clicked', () => {
      cy.contains(TEXT.ingredientDetails).should('not.exist');
      cy.get(SELECTORS.burgerIngredientsList)
        .contains('Мясо бессмертных моллюсков Protostomia')
        .click();
      cy.get(SELECTORS.modalsContainer)
        .contains('Мясо бессмертных моллюсков Protostomia')
        .should('exist');
    });

    it('should close ingredient modal when close button is clicked', () => {
      cy.get(SELECTORS.burgerIngredientsList)
        .contains('Мясо бессмертных моллюсков Protostomia')
        .click();
      cy.contains(TEXT.ingredientDetails).should('exist');
      cy.get(SELECTORS.modalCloseButton).click();
      cy.contains(TEXT.ingredientDetails).should('not.exist');
    });

    it('should close ingredient modal when overlay is clicked', () => {
      cy.get(SELECTORS.burgerIngredientsList)
        .contains('Мясо бессмертных моллюсков Protostomia')
        .click();
      cy.contains(TEXT.ingredientDetails).should('exist');
      cy.get(SELECTORS.modalOverlay).click('left', { force: true });
      cy.contains(TEXT.ingredientDetails).should('not.exist');
    });
  });

  describe('Order modal functionality', () => {
    beforeEach(() => {
      cy.intercept('GET', 'api/auth/user', { fixture: 'user.json' });
      cy.intercept('POST', 'api/orders', {
        fixture: 'new-order-response.json'
      }).as('postOrder');

      window.localStorage.setItem(
        'refreshToken',
        JSON.stringify('test-refreshToken')
      );
      cy.setCookie('accessToken', 'test-accessToken');

      cy.viewport(1500, 800);
      cy.visit('/');
    });

    afterEach(() => {
      window.localStorage.clear();
      cy.clearCookie('accessToken');
    });

    it('should create an order when order button is clicked', () => {
      cy.get(SELECTORS.bunsIngredientsSection).contains(TEXT.addButton).click();
      cy.get(SELECTORS.mainIngredientsSection).contains(TEXT.addButton).click();
      cy.get(SELECTORS.sauceIngredientsSection)
        .contains(TEXT.addButton)
        .click();
      cy.contains(TEXT.orderButton).click();
      cy.wait('@postOrder')
        .its('request.body')
        .should('deep.equal', {
          ingredients: [
            '643d69a5c3f7b9001cfa093c',
            '643d69a5c3f7b9001cfa0941',
            '643d69a5c3f7b9001cfa0942'
          ]
        });
      cy.get(SELECTORS.modalsContainer).contains('123').should('exist');
    });

    it('should close order modal and reset constructor when close button is clicked', () => {
      cy.get(SELECTORS.bunsIngredientsSection).contains(TEXT.addButton).click();
      cy.get(SELECTORS.mainIngredientsSection).contains(TEXT.addButton).click();
      cy.get(SELECTORS.sauceIngredientsSection)
        .contains(TEXT.addButton)
        .click();
      cy.contains(TEXT.orderButton).click();
      cy.get(SELECTORS.modalCloseButton).click();
      cy.contains(TEXT.orderId).should('not.exist');
      cy.get(SELECTORS.constructorIngredientsArea)
        .contains('Биокотлета из марсианской Магнолии')
        .should('not.exist');
      cy.get(SELECTORS.constructorIngredientsArea)
        .contains('Соус Spicy-X')
        .should('not.exist');
      cy.get(SELECTORS.constructorIngredientsArea)
        .contains('Краторная булка N-200i')
        .should('not.exist');
    });
  });
});
