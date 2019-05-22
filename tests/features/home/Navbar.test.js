import React from 'react';
import { shallow } from 'enzyme';
import { Navbar } from '../../../src/features/home';

it('renders node with correct class name', () => {
  const renderedComponent = shallow(<Navbar />);
  expect(renderedComponent.find('.home-navbar').length).toBe(1);
});
