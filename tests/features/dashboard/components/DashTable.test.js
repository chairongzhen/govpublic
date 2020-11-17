import React from 'react';
import { shallow } from 'enzyme';
import { DashTable } from '../../../src/features/dashboard';

it('renders node with correct class name', () => {
  const renderedComponent = shallow(<DashTable />);
  expect(renderedComponent.find('.dashboard-dash-table').length).toBe(1);
});
