import React from 'react';
import { configure, shallow } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';

import ProductsSorters from '../ProductsSorters';

describe('ProductCard', () => {
  const setup = (props = {}) => {
    configure({ adapter: new Adapter() });
    const options = {
      context: {
        t: text => text,
      },
    };

    const component = <ProductsSorters {...props} />;

    const enzymeWrapper = shallow(component, options);

    return {
      props,
      enzymeWrapper,
    };
  };

  it('should render self', () => {
    const sortProducts = jest.fn();

    const { enzymeWrapper } = setup({
      sortProducts,
    });

    expect(enzymeWrapper.find('.ProductsSorters')).toHaveLength(1);
  });

  it('one item has active modifier when sorts by -downloads', () => {
    const sortProducts = jest.fn();

    const { enzymeWrapper } = setup({
      productsSortBy: '-downloads',
      sortProducts,
    });

    expect(enzymeWrapper.find('.ProductsSorters__item--active')).toHaveLength(1);
  });

  it('one item has active modifier when sorts by -templateId', () => {
    const sortProducts = jest.fn();

    const { enzymeWrapper } = setup({
      productsSortBy: '-templateId',
      sortProducts,
    });

    expect(enzymeWrapper.find('.ProductsSorters__item--active')).toHaveLength(1);
  });

  it('one item has active modifier when sorts by price', () => {
    const sortProducts = jest.fn();

    const { enzymeWrapper } = setup({
      productsSortBy: 'price',
      sortProducts,
    });

    expect(enzymeWrapper.find('.ProductsSorters__item--active')).toHaveLength(1);
  });

  it('one item has active modifier when sorts by -price', () => {
    const sortProducts = jest.fn();

    const { enzymeWrapper } = setup({
      productsSortBy: '-price',
      sortProducts,
    });

    expect(enzymeWrapper.find('.ProductsSorters__item--active')).toHaveLength(1);
  });

  it('click on first item works correctly', () => {
    const sortProducts = jest.fn();

    const { enzymeWrapper, props } = setup({
      sortProducts,
    });

    enzymeWrapper
      .find('.ProductsSorters__item')
      .first()
      .simulate('click');

    expect(props.sortProducts).toHaveBeenCalledWith('-downloads');
  });

  it('click on second item works correctly', () => {
    const sortProducts = jest.fn();

    const { enzymeWrapper, props } = setup({
      sortProducts,
    });

    enzymeWrapper
      .find('.ProductsSorters__item')
      .at(1)
      .simulate('click');

    expect(props.sortProducts).toHaveBeenCalledWith('-templateId');
  });

  it('click on third item works correctly', () => {
    const sortProducts = jest.fn();

    const { enzymeWrapper, props } = setup({
      sortProducts,
    });

    enzymeWrapper
      .find('.ProductsSorters__item')
      .at(2)
      .simulate('click');

    expect(props.sortProducts).toHaveBeenCalledWith('price');
  });

  it('click on fourth item works correctly', () => {
    const sortProducts = jest.fn();

    const { enzymeWrapper, props } = setup({
      sortProducts,
    });

    enzymeWrapper
      .find('.ProductsSorters__item')
      .at(3)
      .simulate('click');

    expect(props.sortProducts).toHaveBeenCalledWith('-price');
  });
});
