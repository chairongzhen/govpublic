import React from 'react';
import { shallow } from 'enzyme';
import { IndustryBalance } from '../../../src/features/dashboard';

it('renders node with correct class name', () => {
  const renderedComponent = shallow(<IndustryBalance />);
  expect(renderedComponent.find('.dashboard-industry-balance').length).toBe(1);
});
