import React from 'react';
import { shallow } from 'enzyme';
import { P2 } from '../../../src/features/zhangjiang';

it('renders node with correct class name', () => {
  const renderedComponent = shallow(<P2 />);
  expect(renderedComponent.find('.zhangjiang-p-2').length).toBe(1);
});
