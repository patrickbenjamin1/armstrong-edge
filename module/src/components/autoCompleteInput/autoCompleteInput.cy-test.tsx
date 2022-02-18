import { mount } from '@cypress/react';
import { composeStories } from '@storybook/testing-react';
import { cy, describe, it } from 'local-cypress';
import * as React from 'react';

import * as stories from './autoCompleteInput.stories';

const { Default } = composeStories(stories);

describe('Forms - Autocomplete Input', () => {
  it('renders a default autocomplete input', () => {
    mount(<Default />);
    cy.get('.bound-value').as('value').should('have.text', 'bound value: ');
    cy.get('.arm-autocomplete-input').as('input').find('input').should('have.attr', 'placeholder', 'Begin typing to filter options...');
    cy.get('@input').click();
    cy.get('.arm-auto-complete-options').find('.arm-dropdown-item').as('options').should('have.length', 3);
    cy.get('@input').type('r');
    cy.get('@options').should('have.length', 1).and('contain.text', 'red');
    cy.get('@value').should('have.text', 'bound value: ');
    cy.get('@input').clear();
    cy.get('@options').should('have.length', 3);
    cy.get('@input').type('real');
    cy.get('@options').should('not.exist');
    cy.get('.arm-dropdown-items-no-item-text').should('contain.text', 'No results');
    cy.get('@input').clear().type('red');
    cy.get('@options').should('have.attr', 'data-selected', 'true').find('.arm-icon').should('have.attr', 'data-i', 'checkmark3');
    cy.get('@value').should('have.text', 'bound value: 1');
  });
});
