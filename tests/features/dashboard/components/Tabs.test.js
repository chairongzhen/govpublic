import React from 'react';
import { shallow } from 'enzyme';
import { Tabs } from '../../../src/features/dashboard';

it('renders node with correct class name', () => {
  const renderedComponent = shallow(<Tabs />);
  expect(renderedComponent.find('.dashboard-tabs').length).toBe(1);
});
