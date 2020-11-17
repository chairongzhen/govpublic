import React from 'react';
import { shallow } from 'enzyme';
import { MonitorCategory } from '../../../src/features/common';

it('renders node with correct class name', () => {
  const renderedComponent = shallow(<MonitorCategory />);
  expect(renderedComponent.find('.common-monitor-category').length).toBe(1);
});
