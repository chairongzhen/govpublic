import React from 'react';
import { shallow } from 'enzyme';
import { Dashboard } from '../../../src/features/jingrong';

it('renders node with correct class name', () => {
  const renderedComponent = shallow(<Dashboard />);
  expect(renderedComponent.find('.jingrong-dashboard').length).toBe(1);
});
