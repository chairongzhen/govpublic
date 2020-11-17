import React from 'react';
import { shallow } from 'enzyme';
import { VerticalTabs } from '../../../src/features/regional-card';

it('renders node with correct class name', () => {
  const renderedComponent = shallow(<VerticalTabs />);
  expect(renderedComponent.find('.regional-card-vertical-tabs').length).toBe(1);
});
