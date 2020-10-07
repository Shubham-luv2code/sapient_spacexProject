import fetchMock from "jest-fetch-mock"

import React from 'react';
import { render } from '@testing-library/react';
import App from './App';
import { shallow,mount } from 'enzyme';
import { createMemoryHistory } from 'history';

const history = createMemoryHistory();
history.push('/')
test('renders without crashing', () => {
  shallow(<App history={history}/>);
});
test('Check Header Name with h1 tag', () => {
  const wrapper = shallow(<App history={history}/>);
  let linkElement = <h1>SpaceX Launch Program</h1>
  expect(wrapper.contains(linkElement)).toEqual(true);
});
test('Check Header Name with some other tag should return false', () => {
  const wrapper = shallow(<App history={history}/>);
  let linkElement = <h4>SpaceX Launch Program</h4>
  expect(wrapper.contains(linkElement)).toEqual(false);
});
