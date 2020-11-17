import React from 'react';
import { shallow } from 'enzyme';
import { Dashboard } from '../../../src/features/zhangjiang';

it('renders node with correct class name', () => {
  const renderedComponent = shallow(<Dashboard />);
  expect(renderedComponent.find('.zhangjiang-dashboard').length).toBe(1);
});
