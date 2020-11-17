import React from 'react';
import { shallow } from 'enzyme';
import { P4 } from '../../../src/features/zhangjiang';

it('renders node with correct class name', () => {
  const renderedComponent = shallow(<P4 />);
  expect(renderedComponent.find('.zhangjiang-p-4').length).toBe(1);
});
