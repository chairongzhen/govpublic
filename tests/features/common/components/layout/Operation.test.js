import React from 'react';
import { shallow } from 'enzyme';
import { Operation } from '../../../src/features/common';

it('renders node with correct class name', () => {
  const renderedComponent = shallow(<Operation />);
  expect(renderedComponent.find('.common-operation').length).toBe(1);
});
