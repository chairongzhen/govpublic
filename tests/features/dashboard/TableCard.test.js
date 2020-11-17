import React from 'react';
import { shallow } from 'enzyme';
import { TableCard } from '../../../src/features/dashboard';

it('renders node with correct class name', () => {
  const renderedComponent = shallow(<TableCard />);
  expect(renderedComponent.find('.dashboard-table-card').length).toBe(1);
});
