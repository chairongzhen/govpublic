import React from 'react';
import { shallow } from 'enzyme';
import { InvestAttract } from '../../../src/features/dashboard';

it('renders node with correct class name', () => {
  const renderedComponent = shallow(<InvestAttract />);
  expect(renderedComponent.find('.dashboard-invest-attract').length).toBe(1);
});
