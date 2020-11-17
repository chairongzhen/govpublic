import React from 'react';
import { shallow } from 'enzyme';
import { MacroEconomic } from '../../../src/features/regional-card';

it('renders node with correct class name', () => {
  const renderedComponent = shallow(<MacroEconomic />);
  expect(renderedComponent.find('.regional-card-macro-economic').length).toBe(1);
});
