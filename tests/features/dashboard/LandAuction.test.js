import React from 'react';
import { shallow } from 'enzyme';
import { LandAuction } from '../../../src/features/dashboard';

it('renders node with correct class name', () => {
  const renderedComponent = shallow(<LandAuction />);
  expect(renderedComponent.find('.dashboard-land-auction').length).toBe(1);
});
