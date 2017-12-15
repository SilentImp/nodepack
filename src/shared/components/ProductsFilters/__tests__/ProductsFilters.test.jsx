import React from 'react';
import { configure, mount } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';

import ProductsFilters from '../ProductsFilters';

describe('ProductsFilters', () => {
  const setup = (props = {}) => {
    configure({ adapter: new Adapter() });
    const options = {
      context: {
        t: text => text,
      },
    };

    const component = <ProductsFilters {...props} />;

    const enzymeWrapper = mount(component, options);

    return {
      props,
      enzymeWrapper,
    };
  };

  it('lifecycle methods works correctly', () => {
    const handleFilterBlur = jest.fn();

    const { enzymeWrapper } = setup({
      dqi: {
        min: 0,
        max: 0,
        value: {
          min: 0,
          max: 0,
        },
        active: false,
      },
      sqi: {
        min: 0,
        max: 0,
        value: {
          min: 0,
          max: 0,
        },
        active: false,
      },
      rating: {
        min: 0,
        max: 0,
        value: {
          min: 0,
          max: 0,
        },
        active: false,
      },
      handleFilterBlur,
    });

    expect(enzymeWrapper.find('.ProductsFilters')).toHaveLength(1);

    enzymeWrapper.unmount();
  });

  it('setFiltersBarPosition works correctly', () => {
    const handleFilterBlur = jest.fn();

    const { enzymeWrapper } = setup({
      dqi: {
        min: 0,
        max: 0,
        value: {
          min: 0,
          max: 0,
        },
        active: false,
      },
      sqi: {
        min: 0,
        max: 0,
        value: {
          min: 0,
          max: 0,
        },
        active: false,
      },
      rating: {
        min: 0,
        max: 0,
        value: {
          min: 0,
          max: 0,
        },
        active: false,
      },
      showNotification: false,
      handleFilterBlur,
    });

    enzymeWrapper.instance().setFiltersBarPosition();

    expect(enzymeWrapper.state().fixedPosition).toBe(false);
  });

  it('handleWindowScroll works correctly', () => {
    const handleFilterBlur = jest.fn();

    const { enzymeWrapper } = setup({
      dqi: {
        min: 0,
        max: 0,
        value: {
          min: 0,
          max: 0,
        },
        active: false,
      },
      sqi: {
        min: 0,
        max: 0,
        value: {
          min: 0,
          max: 0,
        },
        active: false,
      },
      rating: {
        min: 0,
        max: 0,
        value: {
          min: 0,
          max: 0,
        },
        active: false,
      },
      showNotification: false,
      handleFilterBlur,
    });

    enzymeWrapper.instance().setFiltersBarPosition = jest.fn();

    enzymeWrapper.instance().handleWindowScroll();

    expect(enzymeWrapper.instance().setFiltersBarPosition).toHaveBeenCalled();
  });
});
