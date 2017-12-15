import React from 'react';
import { configure, shallow } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';

import { ProductsSearch } from '../ProductsSearch';

describe('ProductsSearch', () => {
  const setup = (props = {}) => {
    configure({ adapter: new Adapter() });

    const component = <ProductsSearch {...props} />;

    const enzymeWrapper = shallow(component);

    return {
      props,
      enzymeWrapper,
    };
  };

  it('should render self', () => {
    const handleSubmit = jest.fn();
    const getProducts = jest.fn();
    const change = jest.fn();

    const { enzymeWrapper } = setup({
      handleSubmit,
      getProducts,
      change,
    });

    expect(enzymeWrapper.find('.ProductsSearch')).toHaveLength(1);
  });

  it('handleChange works correctly', () => {
    const handleSubmit = jest.fn();
    const getProducts = jest.fn();
    const change = jest.fn();

    const { enzymeWrapper, props } = setup({
      handleSubmit,
      getProducts,
      change,
    });

    enzymeWrapper.instance().handleChange(['1', '2']);

    expect(props.change).toHaveBeenCalledWith('tags', ['1', '2']);
    expect(props.getProducts).toHaveBeenCalled();
  });

  it('preventDefault onSubmit works correctly', () => {
    const handleSubmit = jest.fn();
    const getProducts = jest.fn();
    const change = jest.fn();

    const { enzymeWrapper } = setup({
      handleSubmit,
      getProducts,
      change,
    });

    const preventDefault = jest.fn();
    enzymeWrapper.instance().renderField({ input: { value: '' } });

    enzymeWrapper.find('.ProductsSearch').simulate('submit', { preventDefault });

    expect(preventDefault).toHaveBeenCalled();
  });
});
