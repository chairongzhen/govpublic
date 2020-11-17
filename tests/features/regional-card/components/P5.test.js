import React from 'react';
import { shallow } from 'enzyme';
import { P5 } from '../../../src/features/regional-card';

it('renders node with correct class name', () => {
  const renderedComponent = shallow(<P5 />);
  expect(renderedComponent.find('.regional-card-p-5').length).toBe(1);
});
