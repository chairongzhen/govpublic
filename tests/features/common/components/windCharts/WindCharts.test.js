import React from 'react';
import { shallow } from 'enzyme';
import { WindCharts } from '../../../src/features/common';

it('renders node with correct class name', () => {
  const renderedComponent = shallow(<WindCharts />);
  expect(renderedComponent.find('.common-wind-charts').length).toBe(1);
});
