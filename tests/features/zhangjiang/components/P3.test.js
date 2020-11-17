import React from 'react';
import { shallow } from 'enzyme';
import { P3 } from '../../../src/features/zhangjiang';

it('renders node with correct class name', () => {
  const renderedComponent = shallow(<P3 />);
  expect(renderedComponent.find('.zhangjiang-p-3').length).toBe(1);
});
