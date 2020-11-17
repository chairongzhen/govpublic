import React from 'react';
import { shallow } from 'enzyme';
import { P3 } from '../../../src/features/regional-card';

it('renders node with correct class name', () => {
  const renderedComponent = shallow(<P3 />);
  expect(renderedComponent.find('.regional-card-p-3').length).toBe(1);
});
