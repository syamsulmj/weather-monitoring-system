import React from 'react';
import { shallow } from 'enzyme';
import { InsetLists } from '../../../src/features/home';

it('renders node with correct class name', () => {
  const renderedComponent = shallow(<InsetLists />);
  expect(renderedComponent.find('.home-inset-lists').length).toBe(1);
});
