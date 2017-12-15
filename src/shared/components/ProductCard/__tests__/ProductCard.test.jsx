import React from 'react';
import { configure, shallow } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';

import { ProductCard } from '../ProductCard';
import DefaultLoader from '../partitions/DefaultLoader';

describe('ProductCard', () => {
  const setup = (props = {}) => {
    configure({ adapter: new Adapter() });

    const component = <ProductCard {...props} />;

    const enzymeWrapper = shallow(component);

    return {
      props,
      enzymeWrapper,
    };
  };

  it('should render self', () => {
    const t = jest.fn(text => text);
    const toggleLike = jest.fn();

    const { enzymeWrapper } = setup({
      feature: 'test',
      platform: 'test',
      price: 1,
      src: 'test',
      title: 'test',
      type: 'test',
      dqi: 1,
      sqi: 1,
      uqi: 1,
      t,
      toggleLike,
    });

    expect(enzymeWrapper.find('.TMLibraryProductCard')).toHaveLength(1);
  });

  it('define color modifier for indexes works correctly', () => {
    const t = jest.fn(text => text);
    const toggleLike = jest.fn();

    const { enzymeWrapper } = setup({
      feature: 'test',
      platform: 'test',
      price: 1,
      src: 'test',
      title: 'test',
      type: 'test',
      t,
      toggleLike,
    });

    expect(enzymeWrapper.instance().defineIndexColor(24)).toBe(
      'TMLibraryProductCard__indexCount--red',
    );
    expect(enzymeWrapper.instance().defineIndexColor(25)).toBe(
      'TMLibraryProductCard__indexCount--yellow',
    );
    expect(enzymeWrapper.instance().defineIndexColor(49)).toBe(
      'TMLibraryProductCard__indexCount--yellow',
    );
    expect(enzymeWrapper.instance().defineIndexColor(50)).toBe(
      'TMLibraryProductCard__indexCount--blue',
    );
    expect(enzymeWrapper.instance().defineIndexColor(74)).toBe(
      'TMLibraryProductCard__indexCount--blue',
    );
    expect(enzymeWrapper.instance().defineIndexColor(75)).toBe(
      'TMLibraryProductCard__indexCount--green',
    );
  });

  it('handlePreviewLoad works correctly', () => {
    const t = jest.fn(text => text);
    const toggleLike = jest.fn();

    const { enzymeWrapper } = setup({
      feature: 'test',
      platform: 'test',
      price: 1,
      src: 'test',
      title: 'test',
      type: 'test',
      t,
      toggleLike,
    });

    enzymeWrapper.instance().handlePreviewLoad();

    expect(enzymeWrapper.state()).toEqual({
      fullImageError: false,
      showFullImage: false,
      previewError: false,
      showLoader: false,
      showPreview: true,
    });
  });

  it('handlePreviewError works correctly', () => {
    const t = jest.fn(text => text);
    const toggleLike = jest.fn();

    const { enzymeWrapper } = setup({
      feature: 'test',
      platform: 'test',
      price: 1,
      src: 'test',
      title: 'test',
      type: 'test',
      t,
      toggleLike,
    });

    enzymeWrapper.instance().handlePreviewError();

    expect(enzymeWrapper.state()).toEqual({
      fullImageError: false,
      showFullImage: false,
      previewError: true,
      showPreview: false,
      showLoader: false,
    });
  });

  it('handleImageLoad works correctly', () => {
    const t = jest.fn(text => text);
    const toggleLike = jest.fn();

    const { enzymeWrapper } = setup({
      feature: 'test',
      platform: 'test',
      price: 1,
      src: 'test',
      title: 'test',
      type: 'test',
      t,
      toggleLike,
    });

    enzymeWrapper.instance().handleImageLoad();

    expect(enzymeWrapper.state()).toEqual({
      fullImageError: false,
      showFullImage: true,
      previewError: false,
      showLoader: false,
      showPreview: false,
    });
  });

  it('handleImageError works correctly', () => {
    const t = jest.fn(text => text);
    const toggleLike = jest.fn();

    const { enzymeWrapper } = setup({
      feature: 'test',
      platform: 'test',
      price: 1,
      src: 'test',
      title: 'test',
      type: 'test',
      t,
      toggleLike,
    });

    enzymeWrapper.instance().handleImageError();

    expect(enzymeWrapper.state()).toEqual({
      fullImageError: true,
      showFullImage: false,
      previewError: false,
      showLoader: false,
      showPreview: false,
    });
  });

  it('formFactor props works correctly', () => {
    const t = jest.fn(text => text);
    const toggleLike = jest.fn();

    const { enzymeWrapper } = setup({
      feature: 'test',
      platform: 'test',
      price: 1,
      src: 'test',
      title: 'test',
      type: 'test',
      rating: 1,
      formFactor: {
        bigSize720: true,
        bigSize960: true,
        bigSize1340: true,
        bigSize1520: true,
        bigSize1880: true,
        bigSize2480: true,
      },
      t,
      toggleLike,
    });

    expect(enzymeWrapper.find('.TMLibraryProductCard--big-720')).toHaveLength(1);
    expect(enzymeWrapper.find('.TMLibraryProductCard--big-960')).toHaveLength(1);
    expect(enzymeWrapper.find('.TMLibraryProductCard--big-1340')).toHaveLength(1);
    expect(enzymeWrapper.find('.TMLibraryProductCard--big-1520')).toHaveLength(1);
    expect(enzymeWrapper.find('.TMLibraryProductCard--big-1880')).toHaveLength(1);
    expect(enzymeWrapper.find('.TMLibraryProductCard--big-2480')).toHaveLength(1);
  });

  it('srcSet props works correctly', () => {
    const t = jest.fn(text => text);
    const toggleLike = jest.fn();

    const { enzymeWrapper } = setup({
      feature: 'test',
      platform: 'test',
      price: 1,
      src: 'test',
      title: 'test',
      type: 'test',
      templateUrl: 'test',
      srcSet: {
        min720: 'test',
        min960: 'test',
        min1340: 'test',
        min1520: 'test',
        min1880: 'test',
        min2480: 'test',
      },
      t,
      toggleLike,
    });

    expect(enzymeWrapper.find('.TMLibraryProductCard__picture').children()).toHaveLength(7);
  });

  it('label works correctly', () => {
    const t = jest.fn(text => text);
    const toggleLike = jest.fn();

    const { enzymeWrapper } = setup({
      feature: 'test',
      platform: 'test',
      price: 1,
      src: 'test',
      title: 'test',
      type: 'test',
      liveDemo: 'test',
      label: 'test',
      t,
      toggleLike,
    });

    expect(enzymeWrapper.find('.TMLibraryProductCard__label')).toHaveLength(1);
  });

  it('description and oldPrice work correctly', () => {
    const t = jest.fn(text => text);
    const toggleLike = jest.fn();

    const { enzymeWrapper } = setup({
      feature: 'test',
      platform: 'test',
      price: 0,
      src: 'test',
      title: 'test',
      type: 'test',
      description: 'test',
      oldPrice: '1',
      t,
      toggleLike,
    });

    expect(enzymeWrapper.find('.TMLibraryProductCard__description')).toHaveLength(1);
    expect(enzymeWrapper.find('.TMLibraryProductCard__oldPrice')).toHaveLength(1);
    expect(enzymeWrapper.find('.TMLibraryProductCard__price').text()).toBe('Free');
  });

  it('price renders correctly when product is weblium', () => {
    const t = jest.fn(text => text);
    const toggleLike = jest.fn();

    const { enzymeWrapper } = setup({
      feature: 'test',
      platform: 'test',
      price: 1,
      src: 'test',
      title: 'test',
      type: 'test',
      isWeblium: true,
      t,
      toggleLike,
    });

    expect(enzymeWrapper.find('.TMLibraryProductCard__price').text()).toBe('1$/mo');
  });
});

describe('DefaultLoader', () => {
  const setup = (props = {}) => {
    const component = <DefaultLoader {...props} />;

    const enzymeWrapper = shallow(component);

    return {
      props,
      enzymeWrapper,
    };
  };

  it('should render self', () => {
    const { enzymeWrapper } = setup({
      loading: false,
    });

    expect(enzymeWrapper.find('.TMLibraryProductCardLoader')).toHaveLength(1);
  });

  it('renders loading modifier', () => {
    const { enzymeWrapper } = setup({
      loading: true,
    });

    expect(enzymeWrapper.find('.TMLibraryProductCardLoader--loading')).toHaveLength(1);
  });
});
