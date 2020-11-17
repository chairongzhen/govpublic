import React from 'react';
import { shallow } from 'enzyme';
import { Menu } from '../../../src/features/zhangjiang';

it('renders node with correct class name', () => {
  const renderedComponent = shallow(<Menu />);
  expect(renderedComponent.find('.zhangjiang-menu').length).toBe(1);
});
