import React from 'react';
import { shallow } from 'enzyme';
import { IndeicalCard } from '../../../src/features/dashboard';

it('renders node with correct class name', () => {
  const renderedComponent = shallow(<IndeicalCard />);
  expect(renderedComponent.find('.dashboard-indeical-card').length).toBe(1);
});
