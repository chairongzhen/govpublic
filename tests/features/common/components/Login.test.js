import React from 'react';
import { shallow } from 'enzyme';
import { Login } from '../../../src/features/common';

it('renders node with correct class name', () => {
  const renderedComponent = shallow(<Login />);
  expect(renderedComponent.find('.common-login').length).toBe(1);
});
