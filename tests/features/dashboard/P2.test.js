import React from 'react';
import { shallow } from 'enzyme';
import { P2 } from '../../../src/features/dashboard';

it('renders node with correct class name', () => {
  const renderedComponent = shallow(<P2 />);
  expect(renderedComponent.find('.dashboard-p-2').length).toBe(1);
});
