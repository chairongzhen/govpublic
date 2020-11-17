import React from 'react';
import { shallow } from 'enzyme';
import { TarBar } from '../../../src/features/common';

it('renders node with correct class name', () => {
  const renderedComponent = shallow(<TarBar />);
  expect(renderedComponent.find('.common-tar-bar').length).toBe(1);
});
