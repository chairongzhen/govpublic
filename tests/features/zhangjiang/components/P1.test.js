import React from 'react';
import { shallow } from 'enzyme';
import { P1 } from '../../../src/features/zhangjiang';

it('renders node with correct class name', () => {
  const renderedComponent = shallow(<P1 />);
  expect(renderedComponent.find('.zhangjiang-p-1').length).toBe(1);
});
