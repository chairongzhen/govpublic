import React from 'react';
import { shallow } from 'enzyme';
import { P1 } from '../../../src/features/regional-card';

it('renders node with correct class name', () => {
  const renderedComponent = shallow(<P1 />);
  expect(renderedComponent.find('.regional-card-p-1').length).toBe(1);
});
