import React from 'react';
import { shallow } from 'enzyme';
import { Loader } from '../../../src/features/home';

it('renders node with correct class name', () => {
  const renderedComponent = shallow(<Loader />);
  expect(renderedComponent.find('.home-loader').length).toBe(1);
});
