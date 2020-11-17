import React from 'react';
import { shallow } from 'enzyme';
import { RegionalCategory } from '../../../src/features/common';

it('renders node with correct class name', () => {
  const renderedComponent = shallow(<RegionalCategory />);
  expect(renderedComponent.find('.common-regional-category').length).toBe(1);
});
