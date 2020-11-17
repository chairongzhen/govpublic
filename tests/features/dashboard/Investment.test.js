import React from 'react';
import { shallow } from 'enzyme';
import { Investment } from '../../../src/features/dashboard';

it('renders node with correct class name', () => {
  const renderedComponent = shallow(<Investment />);
  expect(renderedComponent.find('.dashboard-investment').length).toBe(1);
});
