/*
 * @Author: your name
 * @Date: 2020-11-13 15:19:27
 * @LastEditTime: 2020-11-13 15:22:18
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \src\tests\features\dashboard\EnterpriseOverview.test.js
 */
import React from 'react';
import { shallow } from 'enzyme';
import { EnterpriseOverview } from '../../../src/features/dashboard';

it('renders node with correct class name', () => {
  const renderedComponent = shallow(<EnterpriseOverview />);
  expect(renderedComponent.find('.dashboard-enterprise-overview').length).toBe(1);
});
