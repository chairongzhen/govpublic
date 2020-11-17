import React from 'react';
import { shallow } from 'enzyme';
import { Data } from '../../../src/features/dashboard';

it('renders node with correct class name', () => {
  const renderedComponent = shallow(<Data />);
  expect(renderedComponent.find('.dashboard-data').length).toBe(1);
});
