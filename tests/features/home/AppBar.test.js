import React from 'react';
import { shallow } from 'enzyme';
import { AppBar } from '../../../src/features/home';

it('renders node with correct class name', () => {
  const renderedComponent = shallow(<AppBar />);
  expect(renderedComponent.find('.home-app-bar').length).toBe(1);
});
