import React from 'react';
import { shallow } from 'enzyme';
import { P4 } from '../../../src/features/regional-card';

it('renders node with correct class name', () => {
  const renderedComponent = shallow(<P4 />);
  expect(renderedComponent.find('.regional-card-p-4').length).toBe(1);
});
