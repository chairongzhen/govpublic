import React from 'react';
import { shallow } from 'enzyme';
import { Search } from '../../../src/features/common';

it('renders node with correct class name', () => {
  const renderedComponent = shallow(<Search />);
  expect(renderedComponent.find('.common-search').length).toBe(1);
});
