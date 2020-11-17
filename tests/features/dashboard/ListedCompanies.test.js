import React from 'react';
import { shallow } from 'enzyme';
import { ListedCompanies } from '../../../src/features/dashboard';

it('renders node with correct class name', () => {
  const renderedComponent = shallow(<ListedCompanies />);
  expect(renderedComponent.find('.dashboard-listed-companies').length).toBe(1);
});
