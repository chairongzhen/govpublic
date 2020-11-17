import React from 'react';
import { shallow } from 'enzyme';
import { Topic } from '../../../src/features/dashboard';

it('renders node with correct class name', () => {
  const renderedComponent = shallow(<Topic />);
  expect(renderedComponent.find('.dashboard-topic').length).toBe(1);
});
